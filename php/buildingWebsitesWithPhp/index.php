<?php

require __DIR__ . '/vendor/autoload.php';
date_default_timezone_set('Asia/Taipei');

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

use \Slim\Container;
use \Slim\App;
use \Slim\Views\Twig;
use \Slim\Views\TwigExtension;

// Crear "container" para las vistas de Twig
$container = new Container;

// Creamos y configuramos la Slim App
$app = new App($container);

// Registrar componente en el "container"
$container['view'] = function ($c) {
    $view = new Twig('templates', [
        'cache' => 'auto_reload',
        'debug' => true
    ]);
    $view->addExtension(new TwigExtension(
        $c['router'],
        $c['request']->getUri()
    ));
    return $view;
};

/* Definar las rutas de la app */
// Saludo con paso de argumentos por get
// templates/profile.html
$app->get('/hello/{name}', function ($request, $response, $args) {
    return $this->view->render($response, 'profile.twig', [
        'nombre' => $args['name']
    ]);
})->setName('profile');


// templates/about.twig
$app->get('/', function ($request, $response, $args) {
    return $this->view->render($response, 'about.twig', []);
})->setName('home');

// templates/contact.twig
$app->get('/contact', function ($request, $response, $args) {
    return $this->view->render($response, 'contact.twig', []);
})->setName('contact');


// enviar email
$app->post('/contact', function ($request, $response, $args) {
    // Guardamos en un array las variables pasadas por POST del Form
    $arrayPostValues = $request->getParsedBody();

    // Metemos cada uno en una variable
    $name = $arrayPostValues['name'];
    $email = $arrayPostValues['email'];
    $msg = $arrayPostValues['msg'];

    // Comprobamos que los campos no estan vacios
    if (!empty($name) && !empty($email) && !empty($msg)) {
        $cleanName = filter_var($name, FILTER_SANITIZE_STRING);
        $cleanEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
        $cleanMsg = filter_var($msg, FILTER_SANITIZE_STRING);
    } else {
        return $this->view->render($response, 'contact.twig', []);
    }

    $transport = Swift_SendMailTransport::newInstance('/usr/sbin/sendmail-bs');
    $mailer = \Swift_Mailer::newInstance($transport);

    $message = \Swift_Message::newInstance();
    $message->setSubject('Email from our Website');
    $message->setFrom(array(
        $cleanEmail => $cleanName
    ));
    $message->setTo(array('hector@hectormhermelo.com'));
    $message->setBody($cleanMsg);

    $result = $mailer->send($message);

    if ($result > 0) {
        // Enviar mensaje para decir gracias
        return $this->view->render($response, 'about.twig', []);
    } else {
        // Enviar un mensaje al usuario de que el envio del email falló.
        return $this->view->render($response, 'contact.twig', []);
    }

});


// Lanzar App
$app->run();


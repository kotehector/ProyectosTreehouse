'use strict';

/* Nombre del archivo con el que funciona GULP:
** gulpfile.js
*/

/* Llamamos a la libreria de gulp */
var gulp = require('gulp');

/* Llamamos al plugin: gulp-contact
 * Concatena archivos en 1 solo archivo
 */
var concatGulp = require('gulp-concat');

/* Llamamos al plugin: gulp-uglify
 * Minifica los archivos en 1 solo archivo
 */
var uglifyGulp = require('gulp-uglify');

/* Llamamos al plugin: gulp-rename
 * Renombra el archivo
 */
var renameGulp = require('gulp-rename');

/* Llamamos al plugin: gulp-sass
 * Renombra el archivo
 */
var sassGulp = require('gulp-sass');

/* Llamamos al plugin: gulp-sourcemaps
 * Crea un mapa de los archivos sass y js
 */
var mapsGulp = require('gulp-sourcemaps');

/* Llamamos al plugin: gulp-del
 * Borra archivos que quedaron de ejecuciones anteriores
 */
var cleanGulp = require('del');

/* Metodo para crear una tarea en gulp -> gulp.task()
 * Recibe 2args ('nombre',function())
 * Comando para llamar a una función creada en Gulp.
 * cmd> gulp nombre
 */
gulp.task('hello', function(){
	console.log("hello gulp!");
});

/* Funcion por defecto cuando el COMANDO es:
 * Recibe 3args (nombre,array de tareas, function())
 * cmd> gulp
 * gulp.start('build')		-> se ejecuta la tarea build despues de la clean
 * La utilizamos para pasar todas las tareas
 */
gulp.task('default', ['clean'], function(){
	gulp.start('build');
} );


/* Tarea para CONCATENAR archivos JS y crear MAPS
 * Metodo: gulp.src([]) 				  -> array de rutas a los archivos que queremos concatenar
 *		   .pipe(concatGulp("nombre.js")) -> Utilizamos el plugin para crear nuestro archivo final
 *		   .pipe(gulp.dest('folder'))     -> Metodo para indicar el destino final del archivo creado
 */
gulp.task('concatScriptsJs', function(){
	return gulp.src([
	    'js/jquery.js',
	    'js/sticky/jquery.sticky.js',
	    'js/main.js'])
		.pipe(mapsGulp.init())
		.pipe(concatGulp('app.js'))
		.pipe(mapsGulp.write('./'))
		.pipe(gulp.dest('js'))
});

/* Tarea para MINIFICAR archivos JS
 * El 2ºarg es para decirle que depende de concatScriptsJs
 * Metodo: gulp.src("archivo.js") 	          -> archivo que queremos minificar
 *		   .pipe(uglifyGulp())  			  -> Utilizamos el plugin para crear nuestro archivo final
 *		   .pipe(renameGulp('nombre.min.js')) -> Renombra el archivo al nombre que le pasamos
 *		   .pipe(gulp.dest('folder')) 	      -> Indicamos el destino final del archivo creado
 */
gulp.task('minifyScriptsJs', ["concatScriptsJs"], function(){
	return gulp.src('js/main.js')
		.pipe(uglifyGulp())
		.pipe(renameGulp('app.min.js'))
		.pipe(gulp.dest('js'))
});

/* Tarea para Copilar archivos SASS y crear MAPA
 * Metodo: gulp.src("archivo.js") 	       -> archivo que queremos copilar 
 *		   ..pipe(mapsGulp.init())         -> CREA MAPA de archivos SASS
 *		   .pipe(sassGulp())  			   -> Utilizamos el plugin para crear nuestro archivo final
 *		   .pipe(mapsGulp.write('./'))	   -> escribimos el MAPS y la carpeta relativa al .dest
 *		   .pipe(gulp.dest('folder')) 	   -> Metodo para indicar el destino final del archivo creado
 */
gulp.task('compileSass', function(){
	return gulp.src('scss/application.scss')
		.pipe(mapsGulp.init())
		.pipe(sassGulp())
		.pipe(mapsGulp.write('./'))
		.pipe(gulp.dest('css'));
});

/* Tarea para ver los cambios en SASS en tiempo real y JS
 * Metodo: gulp.watch("patron folder", ["task que copila SASS"]) 	-> archivos que queremos Escuchar con patrón
 * Pattern: Gulp Globbing Documentation 
 */
gulp.task('watchSassAndJs', function(){
	gulp.watch('scss/**/*.scss', ["compileSass"]);
	gulp.watch('js/main.js', ['concatScriptsJs']);
});

/*
 * Tarea para ver los cambios en tiempo real
 */
gulp.task('serve', ['watchSassAndJs']);

/* Tarea para limpiar los archivos que sobran(viejos)
 * del(['array de carpetas y arcihvos a borrar])	-> borra los archivos viejos
 */
gulp.task('clean', function(){
	cleanGulp(['dist', 'css/application.css*', 'js/app*.js*']);
});


/* Tarea para ejecutar todas las tareas y crear la 
 * carpeta final del proyecto 
 * gulp.src([array de archivos finales],        -> array de archivos finales
       { base: './'})							-> obj para la base del proyecto y que siga la estructura de carpetas
 * 	   .pipe(gulp.dest('nombre carpeta final')) -> nombre de destino del proyecto
 */
gulp.task('build', ['minifyScriptsJs','compileSass'], function(){
	return gulp.src(['css/application.css', 'js/app.min.js', 'index.html',
					 'img/**', 'fonts/**'], { base: './'})
			   .pipe(gulp.dest('dist'));
});




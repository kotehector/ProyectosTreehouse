// Problema: La interación del usuario no ofrece los resultados esperados.
// Solución: Añadir interactividad para el funcionamiento correcto del usuario.

var taskInput = document.getElementById("new-task");                      //input
var addButton = document.getElementsByTagName("button")[0];               //buttons[0]
var incompleteTasksHolder = document.getElementById("incomplete-tasks");  //ul
var completedTasksHolder = document.getElementById("completed-tasks");    //ul

/**
  Función para Crear un Nuevo Elemento de la lista de Tareas
  Arg: Nombre de la tarea.
  Return: <li> 
**/
var createNewTaskElement = function(taskString) {
  
  // Creamos el elemento de la lista.
  var listItem = document.createElement("li");
  // Creamos el input (checkbox)
  var checkbox = document.createElement("input");
  // Creamos el label
  var label = document.createElement("label");
  // Creamos el input (text)
  var editInput = document.createElement("input");
  // Creamos el botón de editarbutton.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
    
  // Modificamos los tipos de los input creados
  checkbox.type = "checkbox";
  editInput.type = "text";
  
  // Añadimos textos y clases Css
  editButton.innerText = "Editar";
  editButton.className = "edit";
  deleteButton.innerText = "Borrar";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  // Añadimos cada input creado al <li>
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}


/**
  Función para Añadir Nueva Tarea.
**/
var addTask = function () {
  console.log("Añadir tarea...");
  
  /* Creamos un nuevo elemento de la lista con el texto escrito por el usuario.
  desde #new-task. */
  var listItem = createNewTaskElement(taskInput.value);

  // Añadimos el elemento de la lista al la lista de tareas incompletas  
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  // Borramos el input después de añadir (BEST PRACTICE)
  taskInput.value = "";
}


/**
  Función para Editar Tarea.
**/
var editTask = function() {
  console.log("Editar tarea...");
  // Cuando el botón "editar" es presionado...

  // Seleccionamos el elemento de la lista
  var listItem = this.parentNode;
  // Seleccionamos los input[type=text]
  var editInput = listItem.querySelector("input[type=text]");
  // Seleccionamos la etiqueta
  var label = listItem.querySelector("label");
  
  // Comprobamos si el elemento de la lista tiene "editMode" como clase css
  var containsClass = listItem.classList.contains("editMode");
    // Si la lista de clases contiene .editMode
    if(containsClass){
      // Cambiamos desde .editMode
      // El texto de la label viene del valor del input
      label.innerText = editInput.value;
    } else { 
      // Cambiamos para .editMode
      // El valor del input viene del texto de la label
      editInput.value =label.innerText;
    }
    // Toggle .edtiMode en el elemento de la lista
    listItem.classList.toggle("editMode");

}


/**
  Función para Borrar Tarea.
**/
var deleteTask = function() {
  console.log("Borrar tarea...");
  // Cuando el botón "borrar" es presionado...

    // Borramos el elemento de la lista de tareas
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

/**
  Función para marcar Tarea Completa.
**/
var taskCompleted = function() {
  console.log("Tarea Completa...");
  // Cuando el Checkbox esta "checked"

    // Añadimos el elemento de la lista a la lista #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncompleted);
}

/**
  Función para Tarea Incompleta.
**/
var taskIncompleted = function() {
  console.log("Tarea Incomplete...");
  // Cuando el Checkbox is "unchecked"
    // Añadimos el elemento de la lista a la lista #incompleted-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

/**
  Función para Tarea Incompleta.
  Arg: elemento lista tareas, evento para manejar el checkbox
**/
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Unir elementos de los eventos de la lista...");

  // Seleccionamos los hijos del elemento de la lista de tareas
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  // Unimos "editTask" con el botón editar
  editButton.onclick = editTask;
  
  // Unimos "deleteTask" con el botón borrar
  deleteButton.onclick = deleteTask;
  
  // Unimos "checkBoxEventHandler" con el checkbox
  checkbox.onchange = checkBoxEventHandler; 
}


var ajaxRequest = function() {
  console.log("Solicitud AJAX");
}

// Añadir evento "onclick" para la función "addTask" (Vieja Práctica)
// addButton.onclick = addTask;

// Añadir evento "onclick" para la función "addTask" y "ajasRequest" (Buena Práctica)
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// For para la lista de tareas incompletas
  for (var i=0; i<incompleteTasksHolder.children.length; i++) {
    // Unir eventos con los item de la lista (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }  

// For para la lista de tareas completas
  for (var i=0; i<completedTasksHolder.children.length; i++) {
    // Unir eventos con los item de la lista (taskIncompleted)
        bindTaskEvents(completedTasksHolder.children[i], taskIncompleted);
  }










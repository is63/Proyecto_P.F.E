window.addEventListener("DOMContentLoaded", function () {
    // Guardo el elemento para el nombre del examen
    let nombreExamen = document.getElementById("nombreExamen");
    // Guardo el elemento para la descripcion del examen
    let descripcionExamen = document.getElementById("descripcionExamen");
    // Guardo el boton para cancelar la accion
    let botonCancelar = document.getElementById("cancelar");
    // Guardo el boton para guardar los cambios
    let botonGuardar = document.getElementById("guardarCambios");

    // Guardar los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));
    
    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    // Mostrar el rol que se selecciono previamente
    let mostrarRol = document.getElementById("rol");
    // Recupera el rol de sesion almacenado en localStorage
    let rol = localStorage.getItem("rolSesion");

    // Verifica si hay un rol guardado
    if (!rol) {
        // Si no hay rol, redirige al usuario a la pagina de inicio
        window.location.href = "index.html";
    } else {
        // Si hay rol, crea un enlace para mostrarlo
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green"; // Establece el color del texto a verde
        mensajeRol.textContent = rol; // Asigna el texto del rol
        mostrarRol.append(mensajeRol); // Agrega el rol al elemento correspondiente
    }

    // Recuperar y mostrar categorias en el select
    let categorias = JSON.parse(localStorage.getItem("categorias")); // Intenta cargar las categorias
    // Verifica si las categorias se cargaron correctamente
    if (categorias == null) {
        // Si no se cargan, redirige a la pagina de gestion de categorias
        window.location.href = "gestionarCategorias.html";
    }

    // Obtiene el elemento select para las categorias
    let selectCategoria = document.getElementById("selectCategoria");
    // Itera sobre cada categoria para crear opciones en el select
    categorias.forEach(categoria => {
        let opcion = document.createElement("option"); // Crea un elemento option
        opcion.setAttribute("value", categoria); // Establece el valor de la opcion
        opcion.textContent = categoria; // Asigna el texto de la opcion
        selectCategoria.appendChild(opcion); // Agrega la opcion al select
    });

    // Recuperar preguntas y mostrarlas con checkboxes
    let preguntas = JSON.parse(localStorage.getItem("preguntas")); // Intenta cargar las preguntas
    // Verifica si las preguntas se cargaron correctamente
    if (preguntas == null) {
        // Si no se cargan, redirige a la pagina de gestion de preguntas
        window.location.href = "gestionPreguntas.html";
    }

    // Obtiene el contenedor donde se mostraran las preguntas
    let preguntasContainer = document.getElementById("listaPreguntas");
    // Itera sobre cada pregunta para crear checkboxes
    preguntas.forEach(pregunta => {
        let nombreP = pregunta.split("|")[0]; // Extrae el nombre de la pregunta

        let contenedor = document.createElement("div"); // Crea un div para la pregunta
        contenedor.className = "pregunta"; // Asigna una clase al contenedor

        // Crear checkbox
        let botonCheckbox = document.createElement("input"); // Crea un input
        botonCheckbox.setAttribute("type", "checkbox"); // Establece el tipo como checkbox
        botonCheckbox.setAttribute("id", nombreP); // Establece un ID unico para el checkbox
        contenedor.appendChild(botonCheckbox); // Agrega el checkbox al contenedor

        // Crear etiqueta para la pregunta
        let labelPregunta = document.createElement("label"); // Crea una etiqueta
        labelPregunta.setAttribute("for", nombreP); // Asocia la etiqueta con el checkbox
        labelPregunta.textContent = nombreP; // Asigna el texto de la pregunta
        contenedor.appendChild(labelPregunta); // Agrega la etiqueta al contenedor

        preguntasContainer.appendChild(contenedor); // Agrega el contenedor de la pregunta al contenedor principal
    });

    // Funcion para guardar datos del examen en el array de examenes
    botonGuardar.addEventListener("click", () => {
        let examenes = JSON.parse(localStorage.getItem("examenes")); // Intenta cargar el array de examenes

        // Verifica si no hay examenes y lo inicializa como un array vacio
        if (examenes == null) {
            examenes = [];
        }

        // Validar los campos obligatorios
        if (!nombreExamen.value.trim()) {
            alert("Por favor, ingresa el nombre del examen."); // Alerta si el nombre esta vacio
            return; // Sale de la funcion
        }
        if (!descripcionExamen.value.trim()) {
            alert("Por favor, ingresa la descripcion del examen."); // Alerta si la descripcion esta vacia
            return; // Sale de la funcion
        }
        if (!selectCategoria.value) {
            alert("Por favor, selecciona una categoria."); // Alerta si no se ha seleccionado una categoria
            return; // Sale de la funcion
        }

        // Obtener las preguntas seleccionadas
        let preguntasSeleccionadas = []; // Inicializa un array para las preguntas seleccionadas
        let checkboxes = document.querySelectorAll("#listaPreguntas input[type='checkbox']"); // Selecciona todos los checkboxes
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                preguntasSeleccionadas.push(checkbox.id); // Agrega el ID del checkbox si esta seleccionado
            }
        });

        // Validar que al menos haya una pregunta seleccionada
        if (preguntasSeleccionadas.length === 0) {
            alert("Por favor, selecciona al menos una pregunta."); // Alerta si no hay preguntas seleccionadas
            return; // Sale de la funcion
        }

        // Crear el formato del examen y agregarlo al array de examenes
        // Uso join para cambiar la coma que separaria los campos por el simbolo ~
        let examen = `${nombreExamen.value}|${descripcionExamen.value}|${selectCategoria.value}|${preguntasSeleccionadas.join("~")}`;
        examenes.push(examen); // Agrega el nuevo examen al array

        // Guardar el array de examenes en localStorage
        localStorage.setItem("examenes", JSON.stringify(examenes)); // Almacena el array actualizado en localStorage
        this.window.location.href = "GestionExamen.html"; // Redirige a la pagina de gestion de examenes

        // Limpiar el formulario
        nombreExamen.value = ""; // Limpia el campo del nombre
        descripcionExamen.value = ""; // Limpia el campo de la descripcion
        selectCategoria.value = ""; // Limpia la seleccion de categoria
        checkboxes.forEach(checkbox => (checkbox.checked = false)); // Desmarca todos los checkboxes
    });

    // Boton Cancelar
    botonCancelar.addEventListener("click", () => {
        window.location.href = "elegirExamen.html"; // Redirige a la pagina de elegir examen
    });

    // Boton Volver
    botonVolver.addEventListener("click", () => {
        window.location.href = "elegirExamen.html"; // Redirige a la pagina de elegir examen
    });

    // Boton Salir
    botonSalir.addEventListener("click", function () {
        window.location.href = "index.html"; // Redirige a la pagina de inicio
    });
});

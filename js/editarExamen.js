window.addEventListener("DOMContentLoaded", function () {
    let nombreExamen = document.getElementById("nombreExamen");
    let descripcionExamen = document.getElementById("descripcionExamen");
    let botonCancelar = document.getElementById("cancelar");
    let botonGuardar = document.getElementById("guardarCambios");

    // Guardar los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    // Mostrar el rol que se seleccionó previamente
    let mostrarRol = document.getElementById("rol");
    let rol = localStorage.getItem("rolSesion");

    if (!rol) {
        window.location.href = "index.html";
    } else {
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    }

    // Recuperar y mostrar categorías en el select
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    if (!categorias.length) {
        window.location.href = "gestionarCategorias.html";
    }

    let selectCategoria = document.getElementById("selectCategoria");
    categorias.forEach(categoria => {
        let opcion = document.createElement("option");
        opcion.setAttribute("value", categoria);
        opcion.textContent = categoria;
        selectCategoria.appendChild(opcion);
    });

    // Recuperar preguntas y mostrarlas con checkboxes
    let preguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
    if (!preguntas.length) {
        window.location.href = "gestionPreguntas.html";
    }

    let preguntasContainer = document.getElementById("listaPreguntas");
    preguntas.forEach(pregunta => {
        let nombreP = pregunta.split("|")[0];

        let contenedor = document.createElement("div");
        contenedor.className = "pregunta";

        // Crear checkbox
        let botonCheckbox = document.createElement("input");
        botonCheckbox.setAttribute("type", "checkbox");
        botonCheckbox.setAttribute("id", nombreP);
        contenedor.appendChild(botonCheckbox);

        // Crear etiqueta para la pregunta
        let labelPregunta = document.createElement("label");
        labelPregunta.setAttribute("for", nombreP);
        labelPregunta.textContent = nombreP;
        contenedor.appendChild(labelPregunta);

        preguntasContainer.appendChild(contenedor);
    });

    // Función para guardar datos del examen en el array de examenes
    botonGuardar.addEventListener("click", () => {
        let examenes = JSON.parse(localStorage.getItem("examenes"));

        if(examenes == null){
            examenes = [];
        }

        // Validar los campos obligatorios
        if (!nombreExamen.value.trim()) {
            alert("Por favor, ingresa el nombre del examen.");
            return;
        }
        if (!descripcionExamen.value.trim()) {
            alert("Por favor, ingresa la descripción del examen.");
            return;
        }
        if (!selectCategoria.value) {
            alert("Por favor, selecciona una categoría.");
            return;
        }

        // Obtener las preguntas seleccionadas
        let preguntasSeleccionadas = [];
        let checkboxes = document.querySelectorAll("#listaPreguntas input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                preguntasSeleccionadas.push(checkbox.id);
            }
        });

        // Validar que al menos haya una pregunta seleccionada
        if (preguntasSeleccionadas.length === 0) {
            alert("Por favor, selecciona al menos una pregunta.");
            return;
        }

        // Crear el formato del examen y agregarlo al array de examenes         //uso join para cambiar la coma que separaria los campos por el simbolo ~
        let examen = `${nombreExamen.value}|${descripcionExamen.value}|${selectCategoria.value}|${preguntasSeleccionadas.join("~")}`;
        examenes.push(examen);
        
        console.log(preguntasSeleccionadas);
        
        console.log(examen);
        
        console.log(examenes);

        //Esta es la posicion para ver las preguntas
        //console.log(examenes[0].split("|")[3].split("~"));
        

        // Guardar el array de examenes en localStorage
        localStorage.setItem("examenes", JSON.stringify(examenes));
        alert("Examen guardado exitosamente.");

        // Limpiar el formulario
        nombreExamen.value = "";
        descripcionExamen.value = "";
        selectCategoria.value = "";
        checkboxes.forEach(checkbox => (checkbox.checked = false));
    });

    // Botón Cancelar
    botonCancelar.addEventListener("click", () => {
        window.location.href = "elegirExamen.html";
    });

    // Botón Volver
    botonVolver.addEventListener("click", () => {
        window.location.href = "elegirExamen.html";
    });

    // Botón Salir
    botonSalir.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

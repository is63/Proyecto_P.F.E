// Espera a que el contenido del DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", function () {

    // Guardo el contenedor donde se mostrarán las preguntas
    let preguntasContainer = document.getElementById("preguntasContainer");

    // Guardo el botón para terminar el intento
    let botonTerminarIntento = document.getElementById("terminarIntento");

    // Guardo el elemento donde se mostrará el rol del usuario
    let mostrarRol = document.getElementById("rol");

    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));
    
    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }
   
    // Recupera el rol de sesión almacenado en localStorage
    let rol = localStorage.getItem("rolSesion");

    // Verifica si hay un rol guardado
    if (!rol) {

        // Si no hay rol, redirige al usuario a la página de inicio
        window.location.href = "index.html";

    } else {

        // Si hay rol, crea un elemento para mostrarlo
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green"; // Establece el color del texto a verde
        mensajeRol.textContent = rol; // Asigna el texto del rol
        mostrarRol.append(mensajeRol); // Agrega el rol al elemento para mostrarlo
    }

    // Cargar preguntas desde localStorage
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));

    // Verifica si las preguntas se cargaron correctamente
    if (preguntas == null) {
        alert("Error al cargar las preguntas"); // Muestra un mensaje de error
        window.location.href = "GestionExamen.html"; // Redirige a la página de gestión de exámenes
    }


    // Carga los exámenes desde localStorage
    let examenes = JSON.parse(localStorage.getItem("examenes")); // Intenta cargar los exámenes

    // Verifica si los exámenes se cargaron correctamente
    if (examenes == null) {
        alert("Error al cargar el examen"); // Muestra un mensaje de error
        window.location.href = "GestionExamen.html"; // Redirige a la página de gestión de exámenes
    }


    // Carga el título del examen desde localStorage
    let tituloExamen = localStorage.getItem("examen");
    // Verifica si el título del examen se cargó correctamente

    if (tituloExamen == null) {
        alert("Error al cargar el título del examen"); // Muestra un mensaje de error
        window.location.href = "GestionExamen.html"; // Redirige a la página de gestión de exámenes
    }



    let preguntasExamen; // Para almacenar las preguntas del examen actual
    let respuestas = []; // Para almacenar todas las respuestas

    // Recorre cada examen para encontrar el que corresponde al examen actual
    examenes.forEach(examen => {

        // Comparo el titulo del examen con el titulo actual
        if (examen.split("|")[0] == tituloExamen) {

            // Divide el examen y obtiene las preguntas
            preguntasExamen = examen.split("|")[3].split("~"); 

            // Recorre cada pregunta para obtener las respuestas
            preguntas.forEach(pregunta => {

                // Extrae las opciones de respuesta de la pregunta
                let preguntasActuales = pregunta.split("|").slice(2, 5);

                // Agrego las respuestas a la lista de respuestas
                preguntasActuales.forEach(preguntaActual => {
                    respuestas.push(preguntaActual);
                });
            });
        }
    });

    // Muestro el título del examen en la interfaz
    document.getElementById("tituloExamen").textContent = `Intentar Examen: ${tituloExamen}`;

    let index = 0; // contador para el indice de las respuestas

    // Creo las preguntas en el contenedor
    preguntasExamen.forEach((pregunta) => {

        // Creo un div para cada pregunta
        let preguntaDiv = document.createElement("div");

        // Creo un párrafo para mostrar el texto de la pregunta
        let preguntaTitulo = document.createElement("p");
        preguntaTitulo.textContent = pregunta; // Asigno el texto de la pregunta
        preguntaDiv.appendChild(preguntaTitulo); // Agrega el párrafo al div de la pregunta

        // Creo las opciones de respuesta (radio buttons)
        for (let i = 1; i <= 3; i++) {

            // Crea un input de tipo radio
            let radio = document.createElement("input");
            radio.type = "radio"; // Establezco el tipo como radio
            radio.name = pregunta; // Uso el nombre de la pregunta como nombre para los radiobuttons de la pregunta actual
            radio.id = pregunta + "_" + i; // Creo un ID para cada radio
            radio.value = i; // Asigno un valor del 1 al 3 dependiendo del i del for loop

            // Crea una etiqueta para el radio button
            let label = document.createElement("label");
            label.setAttribute("for", pregunta + "_" + i); // Asocio la etiqueta con el radio button
            label.textContent = respuestas[index]; // Asigno el texto de la respuesta

            // Agrego el radio button y la etiqueta al div de la pregunta
            preguntaDiv.appendChild(radio);
            preguntaDiv.appendChild(label);

            index++; // Incremento el indice para la siguiente respuesta
        }

        // Agrego el div de la pregunta al contenedor de preguntas
        preguntasContainer.appendChild(preguntaDiv);
    });

    //  boton de Terminar Intento
    botonTerminarIntento.addEventListener("click", () => {
        let index2 = 0; // Inicializa un índice para las preguntas

        // Recorre cada pregunta para verificar las respuestas
        preguntasExamen.forEach((pregunta) => {
            let respuestaSeleccionada; // Variable para almacenar la respuesta seleccionada
            // Guardo todas las respuestas seleccionadas
            let respuestasSeleccionadas = document.getElementsByName(pregunta);

            // Verifico cual radiobutton esta seleccionado
            respuestasSeleccionadas.forEach((respuesta) => {
                if (respuesta.checked) {
                    // Guardo el valor de la respuesta seleccionada
                    respuestaSeleccionada = parseInt(respuesta.value);  // Lo paso a numero con parseInt para que la operacion de comparacion siguiente
                                                                        //no lo compare como 2 Strings
                }
            });

            // Guardo la respuesta correcta de la pregunta
            let respuestaCorrecta = preguntas[index2].split("|")[5]; 

            // Comparo la respuesta seleccionada con la respuesta correcta
            if (respuestaSeleccionada == respuestaCorrecta) { 

                // Si la respuesta es correcta, la resalto en verde
                respuestasSeleccionadas.forEach(respuesta => {
                    if (respuesta.checked) {
                        respuesta.parentElement.style.backgroundColor = "#d4edda"; // Verde
                    }
                });
            } else {
                // Si la respuesta es incorrecta, la resalto en rojo
                respuestasSeleccionadas.forEach((respuesta) => {
                    if (respuesta.checked) {
                        respuesta.parentElement.style.backgroundColor = "#f8d7da"; // Rojo
                    }
                });
            }
            index2++; // Incrementa el índice para la siguiente pregunta
        });
    });
});

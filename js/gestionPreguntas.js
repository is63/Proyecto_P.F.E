window.addEventListener("DOMContentLoaded", function () {

    // Guardo el boton de crear pregunta
    let botonCrearPregunta = document.getElementById("crearPregunta");

    // Redirecciono a la pagina a crear pregunta
    botonCrearPregunta.addEventListener("click", () => window.location.href = "editarPregunta");

    // Guardo los botones del footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    // Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = this.document.getElementById("rol");

    // Recupero el rol seleccionado en la pagina anterior
    let rol = this.localStorage.getItem("rolSesion");

    // Si esta vacio o no existe, hago una redireccion al index para que inicie sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    // Si el rol es Profesor
    if (rol == "Profesor") {
        // Creo el elemento para mostrar el rol
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green"; // Establece el color del texto a verde
        mensajeRol.textContent = rol; // Asigna el texto del rol
        // Lo muestro en el header
        mostrarRol.append(mensajeRol);
    }

    // Si el rol es Admin
    if (rol == "Admin") {
        // Creo el elemento
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green"; // Establece el color del texto a verde
        mensajeRol.textContent = rol; // Asigna el texto del rol
        // Lo muestro en el header
        mostrarRol.append(mensajeRol);
    }

    // Recupera las preguntas del localStorage
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));

    // Si no existe ninguna pregunta, redirecciona a crear preguntas
    if (!(preguntas)) {
        window.location.href = "editarPregunta.html";
    }

    // Guardo el elemento al que le voy a dar la funcion de ordenar
    let botonOrdenar = document.getElementById("ordenar");
    // Recupera "ordenado" de localStorage y lo convierte a booleano
    let ordenado = localStorage.getItem("preguntasOrden") === "true";

    // Si no existe el estado de ordenado, lo inicializo como true
    if (ordenado == null) {
        ordenado = true; // Valor predeterminado si no existe en localStorage
    }

    // Funcion de ordenar
    botonOrdenar.addEventListener("click", function (event) {
        if (ordenado) {
            // Ordenar de forma descendente
            preguntas = preguntas.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
            ordenado = false; // Alternar el estado
        } else {
            // Ordenar de forma ascendente
            preguntas = preguntas.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
            ordenado = true; // Alternar el estado
        }
        localStorage.setItem("preguntasOrden", ordenado); // Almacena el estado de ordenado
        localStorage.setItem("preguntas", JSON.stringify(preguntas)); // Almacena las preguntas ordenadas
        window.location.reload(); // Recarga la pagina para mostrar los cambios
    });

    // Ventana donde se ven las preguntas
    let preguntasContainer = document.getElementById("preguntasContainer");

    // Recorre cada pregunta y creo los elementos con la informacion de cada pregunta
    preguntas.forEach(pregunta => {
        let nombreP = pregunta.split("|")[0]; 
        let categoriaP = pregunta.split("|")[1]; 
        let respuesta1 = pregunta.split("|")[2]; 
        let respuesta2 = pregunta.split("|")[3]; 
        let respuesta3 = pregunta.split("|")[4]; 
        let correcta = pregunta.split("|")[5]; 

        // Creo el elemento <details>
        let detalles = document.createElement('details');

        // Creo el elemento <summary> con el nombre de la pregunta (es la pregunta en si)
        let summary = document.createElement('summary');
        summary.textContent = nombreP; 
        detalles.appendChild(summary); // lo añado al <details>

        // Creo el div con los detalles de la pregunta
        let divDetalles = document.createElement('div');
        divDetalles.className = 'detalles'; // Asigna una clase al div

        // Creo el parrafo con la categoria
        let parrafo = document.createElement('p');
        parrafo.textContent = `Categoria: ${categoriaP}`; 
        parrafo.style.fontWeight = "bold"; // Establece el texto en negrita
        parrafo.style.textDecoration = "underline"; // Subraya el texto
        divDetalles.appendChild(parrafo); // Agrega el <p> al div

        // Parrafo para mostrar las respuestas lo siguiente
        let parrafo1 = document.createElement('p');
        parrafo1.textContent = `Respuestas:`; 
        divDetalles.appendChild(parrafo1); // Lo agrego al div

        // Respuesta 1
        let parrafo2 = document.createElement('p');
        if (correcta == 1) {
            parrafo2.style.color = "green"; // Cambia el color a verde si es la respuesta correcta
        }
        parrafo2.style.marginLeft = "1vh"; // margen izquierdo
        parrafo2.textContent = `    Respuesta 1: ${respuesta1}`; 
        divDetalles.appendChild(parrafo2); //Lo agrego al div

        // Respuesta 2
        let parrafo3 = document.createElement('p');
        if (correcta == 2) {
            parrafo3.style.color = "green"; // Cambia el color a verde si es la respuesta correcta
        }
        parrafo3.style.marginLeft = "1vh"; // margen izquierdo
        parrafo3.textContent = `    Respuesta 2: ${respuesta2}`;
        divDetalles.appendChild(parrafo3); // Lo agrego al div

        // Respuesta 3
        let parrafo4 = document.createElement('p');
        if (correcta == 3) {
            parrafo4.style.color = "green"; // Cambia el color a verde si es la respuesta correcta
        }
        parrafo4.style.marginLeft = "1vh"; // margen izquierdo
        parrafo4.textContent = `    Respuesta 3: ${respuesta3}`;
        divDetalles.appendChild(parrafo4); //Lo agrego al div

        // Boton para borrar la pregunta
        let boton = document.createElement("button");
        boton.className = "borrar"; // Asigna una clase al boton
        boton.textContent = "Borrar"; // Texto del boton
        divDetalles.appendChild(boton); //Lo agrego al div

        detalles.appendChild(divDetalles); // Agrega el div al  <detalles>
        preguntasContainer.appendChild(detalles); // Agrego el <details> al contenedor de preguntas
    });


    // Añado un lisener al coontenedor para saber si se hace click en el boton de borrar
    preguntasContainer.addEventListener("click", function (event) {
        if (event.target.matches(".borrar")) { // Verifica si el objetivo del clic es el boton de borrar
            for (let i = 0; i < preguntas.length; i++) {
                let pregunta = event.target.closest("details"); // Encuentra el elemento details mas cercano

                // Si la pregunta del elemento del boton al que se le ha hecho clic es igual que la pregunta actual, se borra
                if (pregunta.firstChild.textContent == preguntas[i].split("|")[0]) {
                    if (confirm("Seguro que quieres borrar la pregunta " + pregunta.firstChild.textContent)) {
                        pregunta.remove(); // Borro el elemento de la lista de preguntas
                        preguntas.splice(i, 1); // Elimino la pregunta del array
                    } else {
                        alert("No se ha borrado la pregunta"); // mensaje de cancelacion 
                    }
                }
            }

            localStorage.setItem("preguntas", JSON.stringify(preguntas)); // Actualizo el localStorage con las preguntas restantes
            window.location.reload(); // Recargo la pagina para mostrar los cambios
        }
    });

    // Boton de Volver del Footer
    botonVolver.addEventListener("click", () => {
        // Redirecciono a la pagina anterior
        window.location.href = "elegirExamen.html"; // No uso window.history.back(), por si viene de una pagina siguiente
    });

    // Boton de Salir del Footer
    botonSalir.addEventListener("click", function () {
        // Redirecciono al index para que se reescriba el localStorage de usuarioSesion y vuelva a iniciar sesion
        window.location.href = "index.html"; // Redirige a la pagina de inicio
    });
});

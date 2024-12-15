window.addEventListener("DOMContentLoaded", function () {

    //Selecciono el boton de crear pregunta
    let botonCrearPregunta = document.getElementById("crearPregunta");

    //Redirecciono a la pagina a crear pregunta
    botonCrearPregunta.addEventListener("click", () => this.window.location.href = "editarPregunta");

    //Selecciono los botones del footer de Volver, Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = this.document.getElementById("rol");

    //Recupero el rol seleccionado en la página anterior
    let rol = this.localStorage.getItem("rolSesion");

    //si esta vacio o no existe, hago una redireccion al index para que inicie Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    if (rol == "Profesor") {
        //Creo el elemento para mostrar el rol
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el header
        mostrarRol.append(mensajeRol);
    };

    if (rol == "Admin") {
        //Creo el elemento
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el Header
        mostrarRol.append(mensajeRol);
    }

    let preguntas = JSON.parse(localStorage.getItem("preguntas"));

    //Si no existe ninguna pregunta, redirecciona a crear preguntas
    if (!(preguntas)) {
        window.location.href = "editarPregunta.html";
    }

    //Guardo el elemento al que le boy a dar la funcion de ordenar
    let botonOrdenar = document.getElementById("ordenar");
    // Recupera "ordenado" de localStorage y lo convierte a booleano por eso se hace una comparacion
    let ordenado = localStorage.getItem("preguntasOrden") === "true";

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
        localStorage.setItem("preguntasOrden", ordenado);
        localStorage.setItem("preguntas", JSON.stringify(preguntas));
        window.location.reload();

    });

    //Ventana donde se ven las preguntas
    let preguntasContainer = document.getElementById("preguntasContainer");

    preguntas.forEach(pregunta => {
        let nombreP = pregunta.split("|")[0];
        let categoriaP = pregunta.split("|")[1];
        let respuesta1 = pregunta.split("|")[2];
        let respuesta2 = pregunta.split("|")[3];
        let respuesta3 = pregunta.split("|")[4];
        let correcta = pregunta.split("|")[5];


        // Crear el elemento <details>
        let detalles = document.createElement('details');

        // Crear el elemento <summary>
        let summary = document.createElement('summary');
        summary.textContent = nombreP; // Texto del resumen
        detalles.appendChild(summary);

        // Crear el div con detalles
        let divDetalles = document.createElement('div');
        divDetalles.className = 'detalles';


        // Crear el párrafo con detalles
        let parrafo = document.createElement('p');
        parrafo.textContent = `Respuestas:`; // Texto del párrafo
        divDetalles.appendChild(parrafo);

        let parrafo2 = document.createElement('p');
        if (correcta == 1) {
            parrafo2.style.color = "green"
        }
        parrafo2.style.marginLeft = "1vh"
        parrafo2.textContent = `    Respuesta 1: ${respuesta1}`; // Texto del párrafo
        divDetalles.appendChild(parrafo2);

        let parrafo3 = document.createElement('p');
        if (correcta == 2) {
            parrafo3.style.color = "green"
        }
        parrafo3.style.marginLeft = "1vh"
        parrafo3.textContent = `    Respuesta 2: ${respuesta2}`; // Texto del párrafo
        divDetalles.appendChild(parrafo3);

        let parrafo4 = document.createElement('p');
        if (correcta == 3) {
            parrafo4.style.color = "green"
        }
        parrafo4.style.marginLeft = "1vh"
        parrafo4.textContent = `    Respuesta 3: ${respuesta3}`; // Texto del párrafo
        divDetalles.appendChild(parrafo4);

        let boton = document.createElement("button");
        boton.className = "borrar";
        boton.textContent = "Borrar"
        divDetalles.appendChild(boton);

        detalles.appendChild(divDetalles);

        preguntasContainer.appendChild(detalles);

    });

    preguntasContainer.addEventListener("click", function (event) {

        if (event.target.matches(".borrar")) {

            for (let i = 0; i < preguntas.length; i++) {

                let pregunta = event.target.closest("details");

                //Si la pregunta del elemento del boton al que se le ha hecho click  es igual que el de la pregunta actual, se borra
                if (pregunta.firstChild.textContent == preguntas[i].split("|")[0]) {
                    if (confirm("Seguro que quieres borrar la pregunta " + pregunta.firstChild.textContent)) {
                        pregunta.remove();

                        preguntas.splice(i, 1);
                        console.log(preguntas);
                    }
                    else {
                        alert("no se ha borrado la pregunta");
                    }
                }
            }

            localStorage.setItem("preguntas", JSON.stringify(preguntas));
            window.location.reload();


        }
    });


    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () => {
        //redirecciono a la página anterior
        window.location.href = "elegirExamen.html"; //no uso window.history.back(), por si viene de una pagina siguiente
    });

    //  Boton de Salir del Footer  //
    botonSalir.addEventListener("click", function () {
        //redirecciono al index para que se reescriva el localStorage de ususarioSesion y vuelva a iniciar Sesion
        window.location.href = "index.html";

    });

});
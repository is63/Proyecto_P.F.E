window.addEventListener("DOMContentLoaded", function () {



    //Boton de Guardar
    let botonGuardar = this.document.getElementById("botonGuardar");

    //Boton de cancelar
    let botonCancelar = this.document.getElementById("botonCancelar");

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");


    //Crear array de preguntas que no se borre como en el index


    //guardo el titulo para mostrar mas adelante el mensaje de error abajo suyo
    let titulopreguntas = this.document.getElementById("editarPreguntas").firstElementChild;


    //Creo un elemento p para mostrar el mensaje de error por si la pregunta en blanco
    let mensajeErrorPregunta = document.createElement("p");
    //Pongo el mensaje el blanco por si falla mas de 1 vez no se acumulen
    mensajeErrorPregunta.textContent = "";

    //Creo un elemento p para mostrar el mensaje de error por si hay una respuesta en blanco
    let mensajeErrorRespuestas = document.createElement("p");
    //Pongo el mensaje el blanco por si falla mas de 1 vez no se acumulen
    mensajeErrorRespuestas.textContent = "";

    //Creo un elemento p para mostrar el mensaje de error por si no se ha seleccionado ninguna respuesta como correcta
    let mensajeErroCorrecta = document.createElement("p");
    mensajeErroCorrecta.textContent = "";


    //Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = document.getElementById("rol");

    //Recupero el rol seleccionado en la página anterior
    let rol = this.localStorage.getItem("rolSesion");

    //si esta vacio o no existe, hago una redireccion al index para que inicie Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }
    else {
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el Header
        mostrarRol.append(mensajeRol);
    }


    //Boton de Guardar  //
    botonGuardar.addEventListener("click", function (event) {
        event.preventDefault();

        //  Guardo los valores del formulario  //

        let pregunta = document.getElementById("pregunta").value;
        console.log(pregunta);

        let respuesta1 = document.getElementById("respuesta1").value;
        console.log(respuesta1);

        let respuesta2 = document.getElementById("respuesta2").value;
        console.log(respuesta2);

        let respuesta3 = document.getElementById("respuesta3").value;
        console.log(respuesta3);

        // Consigo un array con los valores del radiobutton
        let valores = document.getElementsByName("respuestaCorrecta");
        let valorCorrecto;

        //Recorro el radio button buscando el valor seleccionado
        for (let i = 0; i < valores.length; i++) {

            if (valores[i].checked) {//Si el valor esta selecionado
                valorCorrecto = valores[i].value; //guardo el valor selecionado 
                break; //Salgo del bucle
            }
        }

        console.log(valorCorrecto);




        //  Si no hay seleccionada una respuesta correcta salta un mensaje de error de debajo del titulo 
        if (valorCorrecto == undefined || valorCorrecto == "" || valorCorrecto == null) {

            mensajeErroCorrecta.textContent = "Selecciona una respuesta correcta";
            mensajeErroCorrecta.style.color = "red";
            mensajeErroCorrecta.style.margin = "1.5vh";
            mensajeErroCorrecta.style.textAlign = "center";
            mensajeErroCorrecta.style.fontWeight = "bolder";
            mensajeErroCorrecta.style.fontSize = "20px";

            titulopreguntas.after(mensajeErroCorrecta);

        }

        //  Si las algunas de las preguntas esta en blanco salta un mensaje de error de debajo del titulo 
        if (respuesta1 == "" || respuesta2 == "" || respuesta3 == "") {
            mensajeErrorRespuestas.textContent = "Completa las respuestas";
            mensajeErrorRespuestas.style.color = "red";
            mensajeErrorRespuestas.style.margin = "1.5vh";
            mensajeErrorRespuestas.style.textAlign = "center";
            mensajeErrorRespuestas.style.fontWeight = "bolder";
            mensajeErrorRespuestas.style.fontSize = "20px";

            titulopreguntas.after(mensajeErrorRespuestas);

        }

        //Si la pregunta esta en blanco, muestro un mensaje de error debajo del titulo
        if (pregunta == "") {
            mensajeErrorPregunta.textContent = "Completa la pregunta";
            mensajeErrorPregunta.style.color = "red";
            mensajeErrorPregunta.style.margin = "1.5vh";
            mensajeErrorPregunta.style.textAlign = "center";
            mensajeErrorPregunta.style.fontWeight = "bolder";
            mensajeErrorPregunta.style.fontSize = "20px";

            titulopreguntas.after(mensajeErrorPregunta);

        }

        //Si los campos anteriores estan completos, dejo el mensaje de error en blanco para eliminarlo de la vista 
        if (!(respuesta1 = "" || respuesta2 == "" || respuesta3 == "")) {
            mensajeErrorRespuestas.textContent = "";
        } if (!(valorCorrecto == undefined || valorCorrecto == "" || valorCorrecto == null)) {
            mensajeErroCorrecta.textContent = "";
        }
        if (!(pregunta == "")) {
            mensajeErrorPregunta.textContent = ""
        }

        //Si algunos hay algun error detengo la ejecucion de la página
        if (
            (valorCorrecto == undefined || valorCorrecto == "" || valorCorrecto == null)
            && (respuesta1 == "" || respuesta2 == "" || respuesta3 == "")
            && (pregunta == "")
        ) {
            return;
        }
        
        else{
            localStorage.setItem("pregunta", `${pregunta} ${respuesta1} ${respuesta2} ${respuesta3} ${valorCorrecto}`)
        }

    });


    //  Boton de Cancelar  //
    botonCancelar.addEventListener("click", function (event) { //si cancela se refresca la pagina para que se pierda lo introducido
        event.preventDefault();
        window.location.reload();
    });

    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () => {
        //Redirecciona a la página anterior 
        window.location.href = "elegirExamen.html";
    });

    botonSalir.addEventListener("click", function () {
        //Redireccciona al index a que inicie sesion de nuevo
        window.location.href = "index.html";

    });

});
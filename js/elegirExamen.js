window.addEventListener("DOMContentLoaded", function () {

    //Conseguir los botones de seleccion
    let botonCrearPregunta = this.document.getElementById("crearPreguntas");
    let botonCrearExamen = this.document.getElementById("crearExamen");
    let botonGestionarPreguntas = this.document.getElementById("gestionarPreguntas");

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));

    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    //Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = document.getElementById("rol");

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

    //  Boton de Crear Pregunta  //
    botonCrearPregunta.addEventListener("click", function () {
        window.location.href = "editarPregunta.html";
    });

    //  Boton de Gestionar Pregunta  //
    botonGestionarPreguntas.addEventListener("click", () => {
        this.window.location.href = "gestionPreguntas.html";
    });

    //  Boton de Crear Examen  //
    botonCrearExamen.addEventListener("click", function () {
        window.location.href = "editarExamen.html"
    });

    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () => {
        //Redirecciona a la página anterior 
        window.location.href = "acciones.html";
    });

    botonSalir.addEventListener("click", function () {
        //Redireccciona al index a que inicie sesion de nuevo
        window.location.href = "index.html";

    });

});
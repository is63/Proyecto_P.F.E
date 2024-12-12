window.addEventListener("DOMContentLoaded", function () {
    //Guardo los botones principales de la página
    let botonRealizarExamen = this.document.getElementById("realizarExamen");
    let botonCrearExamen = this.document.getElementById("crearExamen");
    let botonGestionUsuarios = this.document.getElementById("gestionar");
    let botonGestionCategorias = this.document.getElementById("gestionarCategorias");

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = document.getElementById("rol");

    //Recupero el rol seleccionado en la página anterior
    let rol = this.localStorage.getItem("rolSesion");

    //si esta vacio o no existe, hago una redireccion al index para que inicie Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    //Si el rol es de alumno oculto los botones por si acaso y redirecciono a la pagina de los examenes
    if (rol == "Alumno") {

        //oculto los botones 
        botonCrearExamen.style.display = "none";
        botonGestionUsuarios.style.display = "none";

        //Le aumento  el tamaño a los botones restantes
        let botones = this.document.querySelectorAll("button");
        botones.forEach(boton => { boton.style.width = "30%" })

        //Redirección a la pagina de los examenes
        window.location.href = "GestionExamen.html";

    };


    //si el rol es profesor oculto el boton de Gestionar Usuarios y creo un elemento para mostrar el rol en el Header
    if (rol == "Profesor") {

        //Oculto el boton
        botonGestionUsuarios.style.display = "none";

        //Le aumento  el tamaño a los botones restantes
        let botones = this.document.querySelectorAll("button");
        botones.forEach(boton => { boton.style.width = "30%" })

        //Creo el elemento para mostrar el rol
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el header
        mostrarRol.append(mensajeRol);
    };

    //Si el rol es Admin, muestro el rol en el Header 
    if (rol == "Admin") {
        //Creo el elemento
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el Header
        mostrarRol.append(mensajeRol);
    }

    //  Boton Realizar Examen  //
    botonRealizarExamen.addEventListener("click", function () {
        //Redirecciona a la pagina para elegir que examen se va a realizar
        window.location.href = "GestionExamen.html";
    });

    //  Boton Elegir Examen  //
    botonCrearExamen.addEventListener("click", function () {
        //Redirecciona a la página para elegir si Crear Examen o Crear Preguntas
        window.location.href = "elegirExamen.html";
    });

    //  Boton de Gestionar Usuarios  //
    botonGestionUsuarios.addEventListener("click", function () {
        //Redirecciona a la página para gestionar Usuarios
        window.location.href = "gestionUsuarios.html";
    });

    //  Boton de Gestionar Categorias  //
    botonGestionCategorias.addEventListener("click",function(){
        //Redirecciona a la página para gestionar las Categorias
        window.location.href = "gestionarCategorias.html";
    });

    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () => {
        //Redirecciona a la página anterior 
        window.location.href = "rol.html";
    });

    botonSalir.addEventListener("click", function () {
        //Redireccciona al index a que inicie sesion de nuevo
        window.location.href = "index.html";

    });
});
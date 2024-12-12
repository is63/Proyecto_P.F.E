window.addEventListener("DOMContentLoaded", function () {

    //Conseguir los botones de seleccion
    let botonCrearPregunta = this.document.getElementById("crearPreguntas");
    let botonCrearExamen = this.document.getElementById("crearExamen");

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
        botonCrearPregunta.addEventListener("click", function(){
            window.location.href = "editarPregunta.html";
        });

        //  Boton de Crear Examen  //
        botonCrearExamen.addEventListener("click", function(){
            window.location.href = "editarExamen.html"
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
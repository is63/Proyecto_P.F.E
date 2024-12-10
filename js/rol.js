window.addEventListener("DOMContentLoaded", () => {

    //Selecciono los botones de opcion
    let botonAlumno = document.getElementById("alumno");
    let botonProfesor = document.getElementById("profesor");
    let botonAdmin = document.getElementById("admin");

    let mostrarRol = document.getElementById("rol");

    let usuarioSesion = (localStorage.getItem("usuarioSesion"));

    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    usuarioSesion = usuarioSesion.split(" ");

    //Uso slice porque me añade al final una barra o unas comillas igual que en el valor de usuario[0]

    //Informacion del usuario con la sesion iniciada
    let usuario;
    //Hago esta comprobacion por si el usuario vuelve de la pagina siguiente que se mantenga la información
    //Como en el index se pasa con "" al principio y al final compruebo que no esten 
    if (usuarioSesion[0][0] == '"') {
        usuario = usuarioSesion[0].slice(1);
    }
    else {
        usuario = usuarioSesion[0];
    }

    let contrasena = usuarioSesion[1];
    let rol;
    
    if (usuarioSesion[2][usuarioSesion[2].length-1] == '"') {
        rol = usuarioSesion[2].slice(0, -1);
    }
    else{
        rol = usuarioSesion[2];
    }


    if (rol == "Alumno") {

        botonAdmin.style.display = "none";
        botonProfesor.style.display = "none";

        window.location.href = "GestionExamen.html";

    };

    if (rol == "Profesor") {
        botonAdmin.style.display = "none";
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    };

    if (rol == "Admin") {
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    }

    botonAdmin.addEventListener("click", function () {
        window.location.href = "acciones.html";
    });

    botonProfesor.addEventListener("click", function () {
        rol = "Profesor";
        localStorage.setItem("usuarioSesion", `${usuario} ${contrasena} ${rol}`)
        window.location.href = "acciones.html"
    });





});
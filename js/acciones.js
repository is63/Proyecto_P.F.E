window.addEventListener("DOMContentLoaded", function () {

    let botonRealizarExamen = this.document.getElementById("realizarExamen");
    let botonCrearExamen = this.document.getElementById("crearExamen");
    let botonGestionUsuarios = this.document.getElementById("gestionar");

    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    let mostrarRol = document.getElementById("rol");

    let rol = this.localStorage.getItem("rolSesion");
    //console.log(rol);

    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    if (rol == "Alumno") {

        botonCrearExamen.style.display = "none";
        botonGestionUsuarios.style.display = "none";

        window.location.href = "GestionExamen.html";

    };

    if (rol == "Profesor") {
        botonGestionUsuarios.style.display = "none";
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

    botonRealizarExamen.addEventListener("click", function(){
        window.location.href = "GestionExamen.html";
    });

    botonCrearExamen.addEventListener("click", function(){
        window.location.href = "elegirExamen.html";
    });

    botonGestionUsuarios.addEventListener("click", function(){
        window.location.href = "gestionUsuarios.html";
    });

    botonVolver.addEventListener("click", () => {
        window.location.href = "rol.html";
    });

    botonSalir.addEventListener("click", function () {
        window.location.href = "index.html";

    });
});
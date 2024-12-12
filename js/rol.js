window.addEventListener("DOMContentLoaded", () => {

    //Selecciono los botones de opcion
    let botonAlumno = document.getElementById("alumno");
    let botonProfesor = document.getElementById("profesor");
    let botonAdmin = document.getElementById("admin");

    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    let mostrarRol = document.getElementById("rol");

    let usuarioSesion = (localStorage.getItem("usuarioSesion"));
    let rol;

    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }
  
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for(let i = 0; i < usuarios.length; i++){
      if(usuarios[i].nombre == usuarioSesion){
        rol = usuarios[i].rol;
      }
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
        rol = "Admin";
        localStorage.setItem("rolSesion", `${rol}`)
        window.location.href = "acciones.html";
    });

    botonProfesor.addEventListener("click", function () {
        rol = "Profesor";
        localStorage.setItem("rolSesion", `${rol}`)
        window.location.href = "acciones.html";
    });

    botonAlumno.addEventListener("click", function(){
        rol = "Alumno";
        localStorage.setItem("rolSesion", `${rol}`);
        window.location.href = "acciones.html";
    });

    botonVolver.addEventListener("click", () =>{
        window.location.href = "index.html";
    });

    botonSalir.addEventListener("click", function(){
        window.location.href = "index.html";

    });

});
window.addEventListener("DOMContentLoaded",function(){

    //Cojo TODOS los botones de borrar y editar 
    let botonesEditar = this.document.querySelectorAll(".editar");
    let botonesBorrar = this.document.querySelectorAll(".borrar");

    //Mesaje para saber en que rol esta la sesion
    let mostrarRol = document.getElementById("rol");

    //Consigo el rol almacenado en el localStorage
    let rol = this.localStorage.getItem("rolSesion");
    //console.log(rol);

    //Si esta vacio o undefined, redirecciona l index para iniciar Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }   
    
    //Se el rol es de Alumno, creo un elemento para mostrar el rol, y oculto los botones de editar y borrar
    if (rol == "Alumno") {
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);

        //Oculto los botones de borrar y editar
        botonesEditar.forEach(boton => {
            boton.style.display = "none"
        });
        botonesBorrar.forEach(boton => {
            boton.style.display = "none";
        });
    };



    if (rol == "Profesor") {
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


});
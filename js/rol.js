window.addEventListener("DOMContentLoaded", () => {

    //Selecciono los botones de opcion
    let botonAlumno = document.getElementById("alumno");
    let botonProfesor = document.getElementById("profesor");
    let botonAdmin = document.getElementById("admin");

    //Selecciono los botones del footer de Volver, Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");
    //Seleccino el el parafo donde se mostrará el rol 
    let mostrarRol = document.getElementById("rol");
    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));
    
    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    //declaro rol para especificar su valor en el bucle de mas adelante
    let rol;
    //Recupero el array de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    //Recorro el array de usuarios, para saber el rol del usuario
    for(let i = 0; i < usuarios.length; i++){
        //Si el nombre (email) del array coincide con el del usuario que ha iniciado sesion, guardo el rol y salgo del bucle
      if(usuarios[i].nombre == usuarioSesion){
        rol = usuarios[i].rol;
        break;
      }
    }

    //si el rol es de alumno deshabilito los botones de admin y profesor por si acaso y redirecciono a la página de los examenes direcctamente
    if (rol == "Alumno") {

        //Deshabilito botones
        botonAdmin.style.display = "none";
        botonProfesor.style.display = "none";

        //redireccion
        window.location.href = "GestionExamen.html";

    };

    //Si el rol es profesor deshabilito el boton de admin y creo un elemento para mostrar el rol
    if (rol == "Profesor") {
        //deshabilito el boton
        botonAdmin.style.display = "none";
        //Creo el elmento y lo muestro en el header
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    };

    //Si el rol es admin, solo muestro el rol en el header
    if (rol == "Admin") {
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    }

    //  Funcionalidades de los Botones //

    //  Boton de admin  //
    botonAdmin.addEventListener("click", function () {
        //Reescribo el rol por si acaso
        rol = "Admin";
        //Lo guardo en el LocalStorage para saber con que rol getionar las siguientes páginas
        localStorage.setItem("rolSesion", `${rol}`);
        //Redireccion a la siguiente página
        window.location.href = "acciones.html";
    });

    //  Boton de Profesor  //
    botonProfesor.addEventListener("click", function () {
        //Reescribo el rol por si acaso
        rol = "Profesor";
        //Lo guardo en el localStorage para gestionar las siguientes páginas
        localStorage.setItem("rolSesion", `${rol}`)
        //Redireccion a la siguiente página
        window.location.href = "acciones.html";
    });

    //  Boton de Alumno //
    botonAlumno.addEventListener("click", function(){
        //Reescribo el rol por si acaso 
        rol = "Alumno";
        //Lo guardo en el localStorage para gestionar las siguientes páginas
        localStorage.setItem("rolSesion", `${rol}`);
        //Redirección a la siguiente página
        window.location.href = "acciones.html";
    });

    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () =>{
        //redirecciono a la página anterior
        window.location.href = "index.html"; //no uso window.history.back(), por si viene de una pagina siguiente
    });

    //  Boton de Salir del Footer  //
    botonSalir.addEventListener("click", function(){
        //redirecciono al index para que se reescriva el localStorage de ususarioSesion y vuelva a iniciar Sesion
        window.location.href = "index.html";

    });

});
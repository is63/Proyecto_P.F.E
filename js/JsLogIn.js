window.addEventListener("DOMContentLoaded", () => {
    //Guardar lospara mostrar los formularios
    let botonIrRegistrarse = document.getElementById("registrarse");
    let botonIrLogIn = document.getElementById("iniciarSesion");

    //Guardar los botones para iniciar sesion y registarse
    let botonLogIn = document.getElementById("botonLogIn");
    let botonRegistrarse = document.getElementById("botonRegistrar");

    //Guardar los Formularios
    let formLogIn = document.getElementById("formLogIn");
    
    let formRegistrarse = document.getElementById("formRegistrar");

    //Guardar los campos del formulario de LogIn
    let emailLogIn = document.getElementById("emailLogIn");
    let contrasenaLogIn = document.getElementById("passwordLogIn");

    //Guardar los campos del formulario de Registro 
    let emailRegistrar = document.getElementById("emailRegistrar");
    let contrasenaRegistrar = document.getElementById("contrasenaRegistrar");
    let rolRegistrar = document.getElementById("rolRegistrarse");

    //Guardo el array de usuarios del LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    //console.log(usuarios);

    //Guardar los usuarios a registrar sin borrarlos desde el principio
    let usuariosARegistrar = JSON.parse(localStorage.getItem("usuariosARegistrar"));
    console.log(usuarios == usuariosARegistrar);
    if(usuarios != usuariosARegistrar){
        usuariosARegistrar = usuarios;
        console.log(usuarios);
        console.log(usuariosARegistrar);
    }
    console.log(usuarios == usuariosARegistrar);

    let mensajeFlashActivo = true;
    
    /*if (usuariosARegistrar == null || usuarios.length > usuariosARegistrar.length) {
        alert();
        localStorage.setItem("usuariosARegistrar", JSON.stringify(usuarios));
        console.log(JSON.parse(localStorage.getItem("usuariosARegistrar")));
    }*/


    //Funcion para mostrar el formulario de registro
    botonIrRegistrarse.addEventListener("click", function (event) {
        event.preventDefault();
        formLogIn.style.display = "none";
        formRegistrarse.style.display = "flex";
    });

    //Funcion para mostrar el formulario de incio de sesión
    botonIrLogIn.addEventListener("click", function (event) {
        event.preventDefault();
        formLogIn.style.display = "flex";
        formRegistrarse.style.display = "none";
    })


    //Funcion para Iniciar Sesion
    botonLogIn.addEventListener("submit", function (event) {
        event.preventDefault();

        let email = emailLogIn.value;
        let contrasena = contrasenaLogIn.value;

        //alert(email + " " + contrasena + " " +rol);
        comprobarUsuario(email, contrasena);

    })

    //Funcion para registrarse 
    botonRegistrarse.addEventListener("submit", function (event) {
        event.preventDefault();


        let email = emailRegistrar.value;
        let contrasena = contrasenaRegistrar.value;
        let rol = rolRegistrar.value;

        //alert(email + " " + contrasena + " " +rol);

        let nuevoUsuario = new Usuario(email, contrasena, rol);
        usuarios.push(nuevoUsuario);
        console.log(usuarios);
        console.log(usuarios.length);



        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    });


    function comprobarUsuario(email, contrasena) {
        for (let i = 0; i < usuarios.length; i++) {
            if (email == usuarios[i].nombre && contrasena == usuarios[i].contrasena && usuarios[i].validado) {
                localStorage.setItem("usuarioSesion", email);
                alert("Inicio Completo");
                /**
                 * Redirección
                */
                break;
            }
            //alert("email o contraseña equivocados");
            emailLogIn.value = "";
            contrasenaLogIn.value = "";

            if(mensajeFlashActivo){
                mensajeFlashActivo = false;
            let mensaje = document.createElement("p");
            mensaje.textContent = "email o contrasena incorrecto";
            mensaje.style.color = "red";
            mensaje.style.fontWeight = "bold";
            mensaje.style.margin = "1.5vh";
            mensaje.id = "mensajeFlash";

            formLogIn.firstElementChild.firstElementChild.after(mensaje);}

        }
    }

})
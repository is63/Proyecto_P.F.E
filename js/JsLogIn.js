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
    if (!usuarios) {  //Si no existe el array de usuarios los creo de nuevo

        usuarios = [];

        //Añado el usuario Admin y uno de prueba 
        let usuarioAdmin = new Usuario("admin", "admin", "admin");
        usuarioAdmin.validar();
        usuarios.push(usuarioAdmin);

        let usuarioNuevo = new Usuario("Valentin", "Villa", "Alumno");
        usuarios.push(usuarioNuevo);
    }
    //console.log(usuarios);


    //Muestro todos los usuarios del array
    usuarios.map(usuario => console.log(usuario));
    //console.log(usuarios);


    //Creo un elemento "<p>" para mostrar el mensaje
    let mensaje = document.createElement("p");
    //Añado el mensaje de error debajo del h1 del formulario
    formLogIn.firstElementChild.firstElementChild.after(mensaje);




    //Creo un valor para mostar un mensaje cuando el login sea incorrecto
    let mensajeFlashActivo = true;

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




        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    });


    //Funcion que comprueba que los datos introducidos para iniciar sesion son correctos
    function comprobarUsuario(email, contrasena) {

        //Recorro el array de usuarios para ver si coincide algun usuario con los datos introducidos
        for (let i = 0; i < usuarios.length; i++) {
            //Si coinciden redireccciono a la siguiente página
            if (usuarios[i].validado) {
                if (email == usuarios[i].nombre && contrasena == usuarios[i].contrasena) {
                    //Guardo el usuario ue ha iniciado sesion para mostrar informacion y opciones en páginas siguientes
                    localStorage.setItem("usuarioSesion", email + " " + contrasena);
                    alert("Inicio Completo");
                    /**
                     * Redirección
                    */
                    break;
                }

                //Si los datos no son correctos vacio los campos para que los vuelvan a rellenar
                emailLogIn.value = "";
                contrasenaLogIn.value = "";

                //Si el mensaje esta disponible porque no ha salido antes se ejecuta el if

                //contenido del mensaje
                mensaje.textContent = "email o contrasena incorrecto";
                //estilos aplicados para el mensaje
                mensaje.style.color = "red";
                mensaje.style.fontWeight = "bold";
                mensaje.style.margin = "1.5vh";
                mensaje.style.textAlign = "center";



            }
            else if (email == usuarios[i].nombre && contrasena == usuarios[i].contrasena) {
                //contenido del mensaje
                mensaje.textContent = "Usuario no Validado";
                //estilos aplicados para el mensaje
                mensaje.style.color = "red";
                mensaje.style.fontWeight = "bold";
                mensaje.style.margin = "1.5vh";
                mensaje.style.textAlign = "center";
            }
        }
    }

})
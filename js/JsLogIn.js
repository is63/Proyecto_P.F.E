window.addEventListener("DOMContentLoaded", () => {
    //localStorage.clear();
    localStorage.setItem("usuarioSesion", "");

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
        let usuarioAdmin = new Usuario("admin", "admin", "Admin");
        usuarioAdmin.validar();
        usuarios.push(usuarioAdmin);

        let usuarioNuevo = new Usuario("Valentin", "Villa", "Alumno");
        usuarioNuevo.validar();
        usuarios.push(usuarioNuevo);

        let usuarioProfesor = new Usuario("Sergio", "Bonache" , "Profesor");
        usuarioProfesor.validar();
        usuarios.push(usuarioProfesor);
    }
    //console.log(usuarios);


    //Muestro todos los usuarios del array
    usuarios.map(usuario => console.log(usuario));
    //console.log(usuarios);


    //Creo un elemento "<p>" para mostrar el mensaje de error de inicio de sesion
    let mensaje = document.createElement("p");
    //Añado el mensaje de error debajo del h1 del formulario
    formLogIn.firstElementChild.firstElementChild.after(mensaje);

    //Cre un elemeto <p> para mostrar un mensaje de error en el registro
    let mensajeRegistro = document.createElement("p");
    //Lo añado al html debajo del titulo
    formRegistrarse.firstElementChild.firstElementChild.after(mensajeRegistro);


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


        comprobarUsuario(email, contrasena);

    })




    //Funcion para registrarse 

    botonRegistrarse.addEventListener("submit", function (event) {
        event.preventDefault();

        //Guardo los valores introducidos por el usuario
        let email = emailRegistrar.value;
        let contrasena = contrasenaRegistrar.value;
        let rol = rolRegistrar.value;


        //Comprobaciones para la contraseña
        function comprobar() {
            //Establezco las condiciones a false
            let tamano = false;
            let mayuscula = false;
            let minuscula = false;
            let numero = false;
            let especiales = false;

            //Aplico en las condiciones las funciones para saber si es valida la contraseña o no
            tamano = comprobarLongitud(contrasena);
            mayuscula = comprobarMayuscula(contrasena);
            minuscula = comprobarMinuscula(contrasena);
            numero = comprobarNumero(contrasena);
            especiales = comprobarChasEsp(contrasena);


            //Si la contraseña NO cumple los requisitos devuelve false
            if (!(tamano && minuscula && mayuscula && numero && especiales)) {
                return false;
            }
            //Si la contrasela cumple los requisitos devuelve true
            else {
                return true;
            }
        }

        // Devuelve true si cumple con las condiciones de la longitud o false si no
        function comprobarLongitud(contra) {
            return contra.length >= 8 && contra.length <= 16;
        }

        //Comprueba en las letras de la contrasela hay alguna mayuscula
        function comprobarMayuscula(contra) {
            for (let i = 0; i < contra.length; i++) {
                if (contra[i] >= "A" && contra[i] <= "Z" && isNaN(contra[i])) {
                    return true;
                }
            }
            return false;
        }

        //Comprueba en las letras de la contrasela hay alguna mayuscula
        function comprobarMayuscula(contra) {
            for (let i = 0; i < contra.length; i++) {
                if (contra[i] >= "A" && contra[i] <= "Z" && isNaN(contra[i])) {
                    return true;
                }
            }
            return false;
        }

        //Comprueba con todas las letras de la contraseña y las compara con sus minusculas para saber si hay alguna minuscula
        function comprobarMinuscula(contra) {
            for (let i = 0; i < contra.length; i++) {
                if (contra[i] == contra[i].toLowerCase() && isNaN(contra[i])) {
                    return true;
                }
            }
            return false;
        }

        //Comprueba que el valor no es un campo vacio que es un numero
        function comprobarNumero(contra) {
            for (let i = 0; i < contra.length; i++) {
                if (!isNaN(contra[i]) && contra[i] != " ") {
                    return true;
                }
            }
            return false;
        }

        //Compara todos los caracteres de la contraseña para compararlos con los caracteres especiales, y ver si coinciden 
        function comprobarChasEsp(contra) {
            const charEsp = ["-", "_", "@", "#", "$", "%", "&"];
            for (let i = 0; i < contra.length; i++) {
                if (charEsp.includes(contra[i])) {
                    return true;
                }
            }
            return false;
        }

        let contrasenaValida = comprobar();

        if (!contrasenaValida) {
            mensajeRegistro.textContent = "Contraseña invalida";
            mensajeRegistro.style.color = "red";
            mensajeRegistro.style.fontWeight = "bold";
            mensajeRegistro.style.margin = "1.5vh";
            mensajeRegistro.style.textAlign = "center";
            return;
        }
        else {

            let nuevoUsuario = new Usuario(email, contrasena, rol);
            usuarios.push(nuevoUsuario);
            console.log(usuarios);

            emailRegistrar.value = "";
            contrasenaRegistrar.value = "";

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            mensajeRegistro.textContent = "Espere a ser validado";
            mensajeRegistro.style.color = "green";
            mensajeRegistro.style.fontWeight = "bold";
            mensajeRegistro.style.margin = "1.5vh";
            mensajeRegistro.style.textAlign = "center";

        }
    });


    //Funcion que comprueba que los datos introducidos para iniciar sesion son correctos
    function comprobarUsuario(email, contrasena) {

        //Recorro el array de usuarios para ver si coincide algun usuario con los datos introducidos
        for (let i = 0; i < usuarios.length; i++) {
            //Si coinciden redireccciono a la siguiente página
            if (usuarios[i].validado) {
                if (email == usuarios[i].nombre && contrasena == usuarios[i].contrasena) {
                    //Guardo el usuario ue ha iniciado sesion para mostrar informacion y opciones en páginas siguientes
                    let usuarioSesion = [email,contrasena, usuarios[i].rol]
                    localStorage.setItem("usuarioSesion",JSON.stringify( `${email} ${contrasena} ${usuarios[i].rol}`));

                    //contenido del mensaje
                    mensaje.textContent = "";
                    window.location.href = "rol.html";

                    break;
                }

                else {
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
window.addEventListener("DOMContentLoaded", function () {

    // Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    // Guardo los div donde voy a mostrar los usuarios
    let mostrarValidados = this.document.getElementById("verificados");

    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));

    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    // Guardo el mensaje de rol del Header
    let mostrarRol = this.document.getElementById("rol");

    // Recupero el rol seleccionado en la pagina anterior
    let rol = this.localStorage.getItem("rolSesion");

    // Si esta vacio o no existe, hago una redireccion al index para que inicie sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    // Si el rol es Admin
    if (rol == "Admin") {
        // Creo el elemento
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green"; // Establece el color del texto a verde
        mensajeRol.textContent = rol; // Asigna el texto del rol
        // Lo muestro en el Header
        mostrarRol.append(mensajeRol);
    }

    // Guardo la ventana donde se ven los usuarios
    let gestion = this.document.getElementById("gestion");
    let mostrarNoValidados = this.document.getElementById("noVerificados");

    // Consigo el array de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    // Creo dos arrays, uno para los usuarios validados y otro para los que no lo estan
    let validados = [];
    let noValidados = [];

    // Recorro el array de usuarios para encontrar a los usuarios que estan validados
    usuarios.forEach(usuario => {
        // Si el usuario esta validado
        if (usuario.validado) {
            // Si el rol del usuario es admin no hago nada
            if (usuario.rol == "Admin");

            else {
                // Creo un elemento p nuevo donde muestro el nombre y el rol del usuario
                let nuevoLista = this.document.createElement("p");

                nuevoLista.innerHTML = `
        <span style="color:green;">Nombre: </span><a>${usuario.nombre} </a>
        <input type="button" value="editar" class="editar" id="editarNombre">

        <span style="color:green;">Contraseña: </span><a>${usuario.contrasena} </a>
        <input type="button" value="editar" class="editar" id="editarContrasena">
    

        <span style="color:green;">Rol: </span><a>${usuario.rol} </a>
        <input type="button" value="editar" class="editar" id="editarRol">
    `;

                // Creo el boton de borrar y lo añado a la lista
                let botonBorrar = this.document.createElement("input");
                botonBorrar.setAttribute("type", "button");
                botonBorrar.setAttribute("value", "borrar");
                botonBorrar.setAttribute("id", "borrar");
                nuevoLista.appendChild(botonBorrar);
                mostrarValidados.appendChild(nuevoLista);

                // Creo el boton de Validar y lo añado a la lista
                let botonCheckbox = this.document.createElement("input");
                botonCheckbox.setAttribute("type", "checkbox");
                botonCheckbox.setAttribute("checked", "checked");
                nuevoLista.appendChild(botonCheckbox);
                mostrarValidados.appendChild(nuevoLista);

                // Añado el usuario al array de usuarios validados
                validados.push(usuario);
            }
        }
        // Si el usuario no esta validado
        else {
            // Creo un elemento p donde muestro el nombre y usuario
            let nuevoLista = this.document.createElement("p");

            // Muestro la informacion del usuario
            nuevoLista.innerHTML = `
        <span style="color:green;">Nombre: </span><a>${usuario.nombre} </a>
        <input type="button" value="editar" class="editar" id="editarNombre">

        <span style="color:green;">Contraseña: </span><a>${usuario.contrasena} </a>
        <input type="button" value="editar" class="editar" id="editarContrasena">
    

        <span style="color:green;">Rol: </span><a>${usuario.rol} </a>
        <input type="button" value="editar" class="editar" id="editarRol">
    `;

            // Creo el boton de borrar y lo añado a la lista
            let botonBorrar = this.document.createElement("input");
            botonBorrar.setAttribute("type", "button");
            botonBorrar.setAttribute("value", "borrar");
            botonBorrar.setAttribute("id", "borrar");
            nuevoLista.appendChild(botonBorrar);
            mostrarValidados.appendChild(nuevoLista);

            // Creo el boton de checkbox y lo añado a la lista
            let botonCheckbox = this.document.createElement("input");
            botonCheckbox.setAttribute("type", "checkbox");
            nuevoLista.appendChild(botonCheckbox);

            mostrarNoValidados.appendChild(nuevoLista);

            // Añado el usuario al array de no validados
            noValidados.push(usuario);
        }
    });

    // Creo un listener de toda la ventana donde se ven los usuarios
    // para darle funcionalidad a los botones de borrar
    gestion.addEventListener("click", function (event) {

        // Si el elemento al que se le ha hecho click es el boton de borrar
        if (event.target.matches("#borrar")) {
            // Selecciono el elemento p padre
            let p = event.target.closest("p");
            // Si el elemento p no es nulo
            if (p) {
                // Guardo el nombre del usuario escrito en la lista
                let nombreP = p.textContent.trim().split(" ")[1];
                // Muestro un mensaje de confirmacion donde muestro el nombre del usuario a eliminar
                if (confirm("Seguro que quiere borrar a " + nombreP)) {
                    // Elimino el elemento p
                    p.remove();
                    // Consigo el index del usuario
                    let indexUsuario = usuarios.findIndex(usuario => usuario.nombre == nombreP);
                    // Si el index existe borro el usuario del array
                    if (indexUsuario != -1) {
                        // Borro el usuario
                        usuarios.splice(indexUsuario, 1);
                        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualiza el localStorage
                        window.location.reload(); // Recarga la pagina
                    }
                } else {
                    alert("El usuario " + nombreP + " no existe"); //Mensaje de error o de cancelacion
                }
            }
        }

        // Funcion de Validar
        if (event.target.matches("input[type='checkbox']")) {
            event.preventDefault();
            let p = event.target.closest("p");

            if (p) {
                // Selecciono el nombre
                let nombreP = p.textContent.trim().split(" ")[1]; // Trim para quitar espacios en blanco

                usuarios.forEach(usuario => {
                    if (nombreP == usuario.nombre) {
                        // Cambio el estado de validacion
                        usuario.validado = !usuario.validado;
                    }
                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualiza el localStorage
                window.location.reload(); // Recarga la pagina
            }
        }

        // Si le da a editar Nombre
        if (event.target.matches("#editarNombre")) {
            event.preventDefault();
            //Selecciono el parrafo donde se ha hecho click
            let p = event.target.closest("p");

            if (p) {
                //Guardo el nombre 
                let nombreP = p.textContent.trim().split(" ")[1];

                usuarios.forEach(usuario => {
                    //Compruebo que el nombre esta en el array de usuarios
                    if (nombreP == usuario.nombre) {
                        //Pido un nuevo nombre para cambiar
                        let nuevoNombre = prompt("Cambiar Nombre");

                        //Si no se ha cancelado el prompt cambio el nombre
                        if (nuevoNombre) {
                            usuario.nombre = nuevoNombre; // Cambio el nombre
                        }
                    }
                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizo el localStorage
                window.location.reload(); // Recargo la pagina
            }
        }

        // Funcion de Editar Contraseña
        if (event.target.matches("#editarContrasena")) {
            event.preventDefault();
            //Selecciono el parrado donde se ha hecho click
            let p = event.target.closest("p");

            if (p) {
                let contrasenaP = p.textContent.trim().split(" ")[19]; // Guardo la contraseña 

                usuarios.forEach(usuario => {
                    //Si la contraseña coincide con alguna contraseña almacenada hago un prompt para cambiarla
                    if (contrasenaP == usuario.contrasena) {
                        let nuevaContrasena = prompt("Cambiar Contraseña"); //Guardo la nueva contraseña

                        //Si no se a cancelado el prompt
                        if (nuevaContrasena) {
                            usuario.contrasena = nuevaContrasena; // Cambio la contraseña
                        }
                    }
                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizo el localStorage
                window.location.reload(); // Recargo la pagina
            }
        }

        // Si le da a editar Rol
        if (event.target.matches("#editarRol")) {
            event.preventDefault();

            //Selecciono el parrado donde se ha hecho click
            let p = event.target.closest("p");

            if (p) {
                let rolP = p.textContent.trim().split(" ")[19]; // Guardo la contraseña 

                usuarios.forEach(usuario => {
                    //Si la contraseña es igual a una almacenada pido un nuevo rol
                    if (rolP == usuario.rol) {
                        let nuevoRol = prompt("Cambiar Rol"); //Como no se como hacerlo de otra manera hay que escribir uno de los 3 roles
                        //(Alumno, Profesor o Admin ) y sin equivocarse puede dar problemas con la validacion en otras páginas

                        //Si no se ha cancelado el prompt
                        if (nuevoRol) {
                            usuario.rol = nuevoRol; // Cambio el rol
                        }
                    }
                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizo el localStorage
                window.location.reload(); // Recargo la pagina
            }
        }
    });

    // Boton de Volver del Footer
    botonVolver.addEventListener("click", () => {
        // Redirecciono a la pagina anterior
        window.location.href = "elegirExamen.html"; // Redirige a la pagina de elegir examen
    });

    // Boton de Salir del Footer
    botonSalir.addEventListener("click", function () {
        // Redirecciono al index para que se reescriba el localStorage de usuarioSesion
        window.location.href = "index.html"; // Redirige a la pagina de inicio
    });
});

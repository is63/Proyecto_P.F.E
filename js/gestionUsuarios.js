window.addEventListener("DOMContentLoaded", function () {

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Guardo los div donde voy a mostrar los usuarios
    let mostrarValidados = this.document.getElementById("verificados");

    //Guardo el mensaje de rol del Header
    let mostrarRol = this.document.getElementById("rol");

    //Recupero el rol seleccionado en la página anterior
    let rol = this.localStorage.getItem("rolSesion");

    //si esta vacio o no existe, hago una redireccion al index para que inicie Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    if (rol == "Admin") {
        //Creo el elemento
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        //Lo muestro en el Header
        mostrarRol.append(mensajeRol);
    }

    //Guardo la ventada donde se ven los usuarios
    let gestion = this.document.getElementById("gestion");

    let mostrarNoValidados = this.document.getElementById("noVerificados");

    //Consaigo el array de ususarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));


    //creo dos arrays uno para los usuarios validados y otro para los que no lo estan
    let validados = [];
    let noValidados = [];


    //recorro el array de usuarios para encontrar a los usuarios que estan validados
    usuarios.forEach(usuario => {
        //Si el usuario esta Validado : 
        if (usuario.validado) {
            //si el rol del usuario es admin no hago nada
            if (usuario.rol == "Admin");

            else {
                //Creo un elemento p nuevo donde muestro el nombre y el rol del usuario
                let nuevoLista = this.document.createElement("p");

                nuevoLista.innerHTML = `
        <span style="color:green;">Nombre: </span><a>${usuario.nombre} </a>
        <input type="button" value="editar" class="editar" id="editarNombre">

        <span style="color:green;">Contraseña: </span><a>${usuario.contrasena} </a>
        <input type="button" value="editar" class="editar" id="editarContrasena">
    

        <span style="color:green;">Rol: </span><a>${usuario.rol} </a>
        <input type="button" value="editar" class="editar" id="editarRol">
    `;

                //Creo el boton de borrar y lo añado a la lista
                let botonBorrar = this.document.createElement("input");
                botonBorrar.setAttribute("type", "button");
                botonBorrar.setAttribute("value", "borrar");
                botonBorrar.setAttribute("id", "borrar");
                nuevoLista.appendChild(botonBorrar);
                mostrarValidados.appendChild(nuevoLista);

                //Creo el boton de Validar y lo añado a la lista
                let botonCheckbox = this.document.createElement("input");
                botonCheckbox.setAttribute("type", "checkbox");
                botonCheckbox.setAttribute("checked", "checked");
                nuevoLista.appendChild(botonCheckbox)
                mostrarValidados.appendChild(nuevoLista);

                //añado el usuario al array de usuarios Validados
                validados.push(usuario);
            }
        }
        //Si el usuario no esta Validado :
        else {
            //Creo un elemento p donde muestro el nombre y usuario

            let nuevoLista = this.document.createElement("p");

            //muestro la informacion del usuario (no se porque me va creado elementos y añadiendolos con appendChild o append, solo he conseguido que funcionase así)
            nuevoLista.innerHTML = `
        <span style="color:green;">Nombre: </span><a>${usuario.nombre} </a>
        <input type="button" value="editar" class="editar" id="editarNombre">

        <span style="color:green;">Contraseña: </span><a>${usuario.contrasena} </a>
        <input type="button" value="editar" class="editar" id="editarContrasena">
    

        <span style="color:green;">Rol: </span><a>${usuario.rol} </a>
        <input type="button" value="editar" class="editar" id="editarRol">
    `;

            //Creo el boton de borrar y lo añado a la lista
            let botonBorrar = this.document.createElement("input");
            botonBorrar.setAttribute("type", "button");
            botonBorrar.setAttribute("value", "borrar");
            botonBorrar.setAttribute("id", "borrar");
            nuevoLista.appendChild(botonBorrar);
            mostrarValidados.appendChild(nuevoLista);

            //Creo el boton de checkbox y lo añado a la lista
            let botonCheckbox = this.document.createElement("input");
            botonCheckbox.setAttribute("type", "checkbox");
            nuevoLista.appendChild(botonCheckbox)

            mostrarNoValidados.appendChild(nuevoLista);

            //Añado el usuario al array de No Validados
            noValidados.push(usuario);

        }
    });

    //Creo un listener de toda la ventana donde se ven los usuarios 
    //para darle funcionalidad a los botones de borrar
    gestion.addEventListener("click", function (event) {

        //Si el elemento al que se le ha hecho click es el boton de borrar
        if (event.target.matches("#borrar")) {
            //Selecciono el elemnto p padre
            let p = event.target.closest("p");
            //Si el elemento p no es nulo 
            if (p) {
                //Guardo el nombre del usuario escrito en la lista
                let nombreP = p.textContent.trim().split(" ")[1];
                //Muestro un mensaje de cofirmacion donde muestro el nombre del usuario a eliminar
                if (confirm("seguro que quiere borrar a " + nombreP)) {
                    //Elimino el elemento p
                    p.remove();
                    //consigo el index del usuario
                    let indexUsuario = usuarios.findIndex(usuario => usuario.nombre == nombreP);
                    //Si el index existe borro el usuario del array
                    if (indexUsuario != -1) {
                        //borro el usuario
                        usuarios.splice(indexUsuario, 1);
                        localStorage.setItem("usuarios", JSON.stringify(usuarios));
                        window.location.reload();

                    }
                }
                else {
                    alert("El usuario " + nombreP + " no existe");
                }
            }
        }

        //Funcion de Validar
        if (event.target.matches("input[type='checkbox']")) {
            event.preventDefault();
            let p = event.target.closest("p");

            if (p) {


                //Selecciono el nombre
                let nombreP = p.textContent.trim().split(" ")[1]; //trim() para quitrar espacios en blanco y split para separarlo por salto de linea? (no lo entiendo muy bien pero funciona)

                usuarios.forEach(usuario => {
                    if (nombreP == usuario.nombre) {

                        //alert(usuario.validado);
                        if ((usuario.validado)) {
                            usuario.validado = false;
                        }
                        else if (!(usuario.validado)) {
                            usuario.validado = true;
                        }
                    }

                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                window.location.reload();
            }
        }

        //Si le da a editar Nombre
        if (event.target.matches("#editarNombre")) {
            event.preventDefault();
            let p = event.target.closest("p");

            if (p) {
                let nombreP = p.textContent.trim().split(" ")[1];

                usuarios.forEach(usuario => {
                    if (nombreP == usuario.nombre) {

                        let nuevoNombre = prompt("Cambiar Nombre");

                        if (nuevoNombre) {
                            usuario.nombre = nuevoNombre;
                        }
                    }

                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                window.location.reload();

            }
        }

        //Funcion de Editar Contraseña
        if (event.target.matches("#editarContrasena")) {
            event.preventDefault();
            let p = event.target.closest("p");

            if (p) {
                let contrasenaP = p.textContent.trim().split(" ")[19];  //Cojo el indice 19 porque con esos 'limitadores' devuelve un array muy largo

                usuarios.forEach(usuario => {
                    if (contrasenaP == usuario.contrasena) {
                       

                        let nuevoNombre = prompt("Cambiar Contraseña");

                        if (nuevoNombre) {
                            usuario.contrasena = nuevoNombre;
                            
                        }
                    }

                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                window.location.reload();
            }
        }

        if (event.target.matches("#editarRol")) {
            event.preventDefault();
            let p = event.target.closest("p");

            console.log(p.textContent.trim().split(" ")[19]);

            if (p) {
                let rolP = p.textContent.trim().split(" ")[19];  //Cojo el indice 19 porque con esos 'limitadores' devuelve un array muy largo

                usuarios.forEach(usuario => {
                    if (rolP == usuario.contrasena) {
                        console.log(usuario.rol);
                        console.log(rolP + " a");

                        let nuevoNombre = prompt("Cambiar Contraseña");

                        if (nuevoNombre) {
                            usuario.rol = nuevoNombre;
                            console.log(usuario.rol);
                        }
                    }

                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                window.location.reload();
            }
        }

    });


    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () => {
        //Redirecciona a la página anterior 
        window.location.href = "acciones.html";
    });

    botonSalir.addEventListener("click", function () {
        //Redireccciona al index a que inicie sesion de nuevo
        window.location.href = "index.html";

    });

});
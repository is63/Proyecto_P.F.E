window.addEventListener("DOMContentLoaded", function () {

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Guardo los div donde voy a mostrar los usuarios
    let mostrarValidados = this.document.getElementById("verificados");
    console.log(mostrarValidados);

    //Guardo la ventada donde se ven los usuarios
    let gestion = this.document.getElementById("gestion");

    let mostrarNoValidados = this.document.getElementById("noVerificados");

    //Consaigo el array de ususarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log(usuarios);

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
                nuevoLista.textContent = `${usuario.nombre} |  rol: ${usuario.rol}`;

                //Creo el boton de borrar y lo añado a la lista
                let botonBorrar = this.document.createElement("input");
                botonBorrar.setAttribute("type", "button");
                botonBorrar.setAttribute("value", "borrar");
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
            nuevoLista.textContent = `${usuario.nombre} |  rol: ${usuario.rol}`;

            //Creo el boton de borrar y lo añado a la lista
            let botonBorrar = this.document.createElement("input");
            botonBorrar.setAttribute("type", "button");
            botonBorrar.setAttribute("value", "borrar");
            nuevoLista.appendChild(botonBorrar);
            mostrarValidados.appendChild(nuevoLista);

            //Creo el boton de checkbox y lo añado a la lista
            let botonCheckbox = this.document.createElement("input");
            botonCheckbox.setAttribute("type", "checkbox");
            nuevoLista.appendChild(botonCheckbox)
            mostrarNoValidados.appendChild(nuevoLista);

            //Añado el usuario al array de No Validados
            noValidados.push(usuario);

            console.log(usuario);

        }
    });

    //Creo un listener de toda la ventana donde se ven los usuarios 
    //para darle funcionalidad a los botones de borrar
    gestion.addEventListener("click", function (event) {
        //Si el elemento al que se le ha hecho click es el boton de borrar
        if (event.target.matches("input[type='button']")) {
            //Selecciono el elemnto p padre
            let p = event.target.closest("p");
            //Si el elemento p no es nulo 
            if (p) {
                //Guardo el nombre del usuario escrito en la lista
                let nombreP = p.textContent.split(" ")[0];
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
                        /**
                         * Falta guardarlo en el localStorage
                         * 
                         * 
                         */
                        console.log(usuarios);
                    }
                }
                else {
                    alert("El usuario " + nombreP + " no existe");
                }
            }
        }
    });

    //Funcionalida de Validar
    gestion.addEventListener("click", function (event) {
        if (event.target.matches("input[type='checkbox']")) {

            let p = event.target.closest("p");

            if (p) {
                let nombreP = p.textContent.split(" ")[0];
                console.log(nombreP);
                usuarios.forEach(usuario => {
                    if (nombreP == usuario.nombre) {
                        console.log(nombreP + " Coincide");
                        alert(usuario.validado);
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
    });

    console.log(validados);
    console.log(noValidados);



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
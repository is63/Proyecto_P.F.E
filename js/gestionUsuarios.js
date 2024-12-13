window.addEventListener("DOMContentLoaded", function () {

    //Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Guardo los div donde voy a mostrar los usuarios
    let mostrarValidados = this.document.getElementById("verificados");
    console.log(mostrarValidados);

    let mostrarNoValidados = this.document.getElementById("noVerificados");

    //Consaigo el array de ususarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    let validados = [];
    let noValidados = [];


    usuarios.forEach(usuario => {
        if (usuario.validado) {
            if(usuario.rol == "Admin"){
                
            }else{
            let nuevoLista = this.document.createElement("p");
            nuevoLista.textContent = `${usuario.nombre} |  rol: ${usuario.rol}`;
            
            let botonBorrar = this.document.createElement("input");
            botonBorrar.setAttribute("type", "button");
            botonBorrar.setAttribute("value", "borrar");
            nuevoLista.appendChild(botonBorrar);
            mostrarValidados.appendChild(nuevoLista);

            let botonCheckbox = this.document.createElement("input");
            botonCheckbox.setAttribute("type", "checkbox");
            botonCheckbox.setAttribute("checked", "checked");
            nuevoLista.appendChild(botonCheckbox)
            mostrarValidados.appendChild(nuevoLista);

            validados.push(usuario);
            console.log(usuario);
            }
        }
        else {

            let nuevoLista = this.document.createElement("p");
            nuevoLista.textContent = `${usuario.nombre} |  rol: ${usuario.rol}`;

            let botonBorrar = this.document.createElement("input");
            botonBorrar.setAttribute("type", "button");
            botonBorrar.setAttribute("value", "borrar");
            nuevoLista.appendChild(botonBorrar);
            mostrarValidados.appendChild(nuevoLista);

            let botonCheckbox = this.document.createElement("input");
            botonCheckbox.setAttribute("type", "checkbox");
            nuevoLista.appendChild(botonCheckbox)
            mostrarNoValidados.appendChild(nuevoLista);


            noValidados.push(usuario);
            console.log(usuario);

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
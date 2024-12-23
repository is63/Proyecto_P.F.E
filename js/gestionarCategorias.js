window.addEventListener("DOMContentLoaded", function () {

    //Selecciono los botones del footer de Volver, Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Guardo los botones
    let botonAgregar = document.getElementById("botonAgregar");

    //guardo la lista donde se van a escribir las categorias
    let lista = document.querySelector("#listaCategorias ul");

    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));
    
    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    //Guardo el elemento donde se va a mostrar el rol que se ha seleccionado
    let mostrarRol = document.getElementById("rol");

    //Recupero el rol seleccionado en la página anterior
    let rol = this.localStorage.getItem("rolSesion");

    //Si está vacío o no existe, hago una redirección al index para que inicie sesión
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }

    if (rol == "Profesor") {
        //Creo el elemento y lo muestro en el header
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    }

    if (rol == "Admin") {
        //Creo el elemento y lo muestro en el header
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    }

    // Consigo el array de categorias, y si no existe lo creo
    let categorias = JSON.parse(localStorage.getItem("categorias"));
    if (!categorias) {  //Si no existe el array de categorías lo creo de nuevo
        categorias = ["ADAS", "Señales", "Carreteras"];
    }
    // Muestro las categoriass en la lista, creado un li para cada elemento y añadiendolo al final
    categorias.forEach(categoria => {
        let li = document.createElement("li");
        li.innerHTML = `${categoria} <button id="botonBorrar">Borrar</button>`;
        lista.appendChild(li);
    });

    // Botón de Agregar Categoría
    botonAgregar.addEventListener("click", function (event) {
        event.preventDefault();

        //Guardo el valor ingresado por el usuario y le quito los espacios en blanco para evitar problemas
        let nuevaCategoria = document.getElementById("nuevaCategoria").value.trim();

        // Si no esta vacio lo añado a la lista y al array de categorias
        if (nuevaCategoria) {
            //Creo el elemento li, le añado el contenido y lo añado a la lista
            let li = document.createElement("li");
            li.innerHTML = `${nuevaCategoria} <button id="botonBorrar">Borrar</button>`;
            lista.appendChild(li);

            //Añado la nueva categoria en el array de categorias
            categorias.push(nuevaCategoria);
            console.log(categorias);

            //Guardo el array de categorias en el localStorage
            localStorage.setItem("categorias", JSON.stringify(categorias));

            //Vacio el valor del input
            document.getElementById("nuevaCategoria").value = '';

            //Si esta vacio muestro un mensaje de error
        } else {
            alert("Por favor, ingrese una categoría válida.");
        }
    });

    // Evento para borrar Categorias  //
    lista.addEventListener("click", function (event) {
        //Si el evento se produce desde el boton borrar coge su li
        if (event.target.matches("#botonBorrar")) {
            //selecciono el elemento li que contiene el boton
            let li = event.target.closest("li");
            //Si no es null o undefined borro el li
            if (li) {
                //Selecciono el texto dentro del li y borro el texto que corresponde con el boton de Borrar
                let nombreCategoria = li.textContent.replace("Borrar", "");
                //Muestro un mensaje de confirmacion con un mensaje concatenando el texto de la categoria
                if (confirm(`¿Está seguro de que desea eliminar la categoría "${nombreCategoria}"?`)) {
                    //Busco el indice de la categoria seleccionada 
                    let index = categorias.findIndex(categoria => nombreCategoria.trim() == categoria); //Uso trim() para quitar los espacios en blanco, si no no funciona

                    if (index == -1) {
                        alert("La categoria existente ya esta borrada");
                    } else {
                        //Borro la categoria del array de categorias
                        categorias.splice(index, 1);
                        //Borro la categoria de la lista
                        li.remove();
                        //Guardo el array sin la categoria en el localStorage
                        localStorage.setItem("categorias", JSON.stringify(categorias));
                    }
                }
            }
        }
    });

        //  Boton de Volver del Footer  //
        botonVolver.addEventListener("click", () =>{
            //redirecciono a la página anterior
            window.location.href = "acciones.html"; //no uso window.history.back(), por si viene de una pagina siguiente
        });
    
        //  Boton de Salir del Footer  //
        botonSalir.addEventListener("click", function(){
            //redirecciono al index para que se reescriva el localStorage de ususarioSesion y vuelva a iniciar Sesion
            window.location.href = "index.html";
    
        });

});

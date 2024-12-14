window.addEventListener("DOMContentLoaded", function () {

    //Guardo los botones
    let botonAgregar = document.getElementById("botonAgregar");

    //guardo la lista donde se van a escribir las categorias
    let lista = document.querySelector("#listaCategorias ul");

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
            let li = document.createElement("li");
            li.innerHTML = `${nuevaCategoria} <button id="botonBorrar">Borrar</button>`;
            lista.appendChild(li);

            categorias.push(nuevaCategoria);
            console.log(categorias);

            localStorage.setItem("categorias", JSON.stringify(categorias));

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
                //cojo el texto dentro del li y borro el del boton
                let nombreCategoria = li.textContent.replace("Borrar", "");
                //Muestro un mensaje de confirmacion con un mensaje concatenando el texto de la categoria
                if (confirm(`¿Está seguro de que desea eliminar la categoría "${nombreCategoria}"?`)) {

                    let index = categorias.findIndex(categoria => nombreCategoria.trim() == categoria); //Uso trim() para quitar los espacios en blanco, si no no funciona

                    if (index == -1) {
                        alert("La categoria existente ya esta borrada");
                    } else {
                        console.log(categorias.splice(index, 1));

                        console.log(index);

                        li.remove();

                        localStorage.setItem("categorias",JSON.stringify(categorias));
                    }
                }
            }
        }
    });
});

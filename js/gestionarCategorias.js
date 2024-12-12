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

    let categorias = JSON.parse(localStorage.getItem("categorias"));
    if (!categorias) {  //Si no existe el array de categorías lo creo de nuevo
        categorias = ["ADAS", "Señales", "Carreteras"];
    }

    categorias.forEach(categoria => {
        let li = document.createElement("li");
        li.innerHTML = `${categoria} <button id="botonBorrar">Borrar</button>`;
        lista.appendChild(li);
    });

    // Botón de Agregar Categoría
    botonAgregar.addEventListener("click", function (event) {
        event.preventDefault();

        let nuevaCategoria = document.getElementById("nuevaCategoria").value.trim();

        if (nuevaCategoria) {
            let li = document.createElement("li");
            li.innerHTML = `${nuevaCategoria} <button id="botonBorrar">Borrar</button>`;
            lista.appendChild(li);
            document.getElementById("nuevaCategoria").value = ''; // Limpiar campo
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
                    li.remove();
                }
            }
        }
    });
});

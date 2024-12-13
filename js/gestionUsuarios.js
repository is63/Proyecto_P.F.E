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

    let gestion = this.document.getElementById("gestion");

    gestion.addEventListener("click",function(event){
        if(event.target.matches("input[type='button']")){
            
            let p = event.target.closest("p");

            if(p){
                let nombreP = p.textContent.split(" ")[0] ;
                if(confirm("seguro que quiere borrar a " + nombreP))
                p.remove();
            }
        }
    });

        gestion.addEventListener("click",function(event){
        if(event.target.matches("input[type='checkbox']")){
            
            let p = event.target.closest("p");

            if(p){
                let nombreP = p.textContent.split(" ")[0] ;
                console.log(nombreP);
                usuarios.forEach(usuario => {
                    if(nombreP == usuario.nombre){
                        console.log(nombreP + " Coincide");
                        alert(usuario.validado);
                        if((usuario.validado)){
                            usuario.validado = false;
                            alert(usuario.validado);
                            //Guardar en localStorage anes de refrescar
                            //window.location.reload();
                        }
                        else if(!(usuario.validado)){
                            usuario.validado = true;
                            alert(usuario.validado);
                            //Guardar en localStorage anes de refrescar
                            //window.location.reload();
                        }
                    }
                    
                });
                
            }
        }
    });

    // Evento para borrar Categorias  //
    /*lista.addEventListener("click", function (event) {
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
    });*/
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
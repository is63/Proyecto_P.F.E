window.addEventListener("DOMContentLoaded", function () {

    // Guardo los elementos clave
    let mostrarRol = document.getElementById("rol");
    let gestionDiv = document.getElementById("gestion").querySelector("div");
    let botonCrearExamen = document.getElementById("crearPregunta"); // Botón Crear Examen
    let rol = localStorage.getItem("rolSesion");

    // Guardo los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    //Recupero el usuario que ha iniciado Sesion
    let usuarioSesion = (localStorage.getItem("usuarioSesion"));
    
    //Si no hay un usuario registrado o esta vacio, redirige al index para iniciar sesion
    if (usuarioSesion == "" || usuarioSesion == undefined) {
        window.location.href = "index.html";
    }

    // Si no hay rol, redirige a la página de inicio de sesión
    if (!rol) {
        window.location.href = "index.html";
        return;
    }

    // Mouesto el rol en la pagina
    let mensajeRol = document.createElement("a");
    mensajeRol.style.color = "green";
    mensajeRol.textContent = rol;
    mostrarRol.append(mensajeRol);

    // Recupero el array examenes del localStorage
    let examenes = JSON.parse(localStorage.getItem("examenes")) || [];

    // Si no hay examenes, muestra un mensaje
    if (examenes.length === 0) {
        let mensaje = document.createElement("p");
        mensaje.textContent = "No hay exámenes disponibles.";
        gestionDiv.appendChild(mensaje);
        return;
    }

    // Creo los detalles de cada examen
    examenes.forEach(examen => {
        
        // Guardo los datos del examen
        let nombre = examen.split("|")[0];
        let descripcion = examen.split("|")[1];
        let categoria = examen.split("|")[2];

        let preguntas = examen.split("|")[3].split("~"); // El array de preguntas lo separo por el simbolo ~

        // Creo el elemento <details>
        let details = document.createElement("details");

        // Creo el <summary> con el nombre del examen
        let summary = document.createElement("summary");
        summary.textContent = nombre;
        details.appendChild(summary);

        // Creo un parrafo con la descripcion del examen
        let descripcionP = document.createElement("p");
        descripcionP.textContent = `Descripción: ${descripcion}`;
        descripcionP.style.color = "black"
        details.appendChild(descripcionP);

        // Creo un parrafo con la categoria del examen
        let categoriaP = document.createElement("p");
        categoriaP.textContent = `Categoría: ${categoria}`;
        //Le doy algo de estilo al parrafo
        categoriaP.style.fontWeight = "bolder";
        categoriaP.style.textDecoration = "underline";
        details.appendChild(categoriaP);

        // Creo un parrafo con la cantidad de preguntas
        let preguntasP = document.createElement("p");
        preguntasP.textContent = `Número de preguntas: ${preguntas.length}`;
        details.appendChild(preguntasP);

        // Creo los botones de Intentar y Borrar
        let botonInsertar = document.createElement("button");
        botonInsertar.textContent = "Intentar";
        botonInsertar.className = "intentar";
        
        let botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.className = "borrar";
        

        // Agrego los botones al <details>
        details.appendChild(botonInsertar);
        //Si el rol es de Alumno no añado el boton de borrar
        if(rol != "Alumno"){details.appendChild(botonBorrar);}
        
        // Agrego el <details> al contenedor principal
        gestionDiv.appendChild(details);

        

        // A los botones le añado la funcionalidad dentro del ForEach porque estan declarados aqui dentro para que haya uno para cada examen

        // Evento para borrar el examen
        botonBorrar.addEventListener("click", () => {
            // Filtrar el examen actual del array de examenes y devuelve todos los examenes menos el seleccionado
            let examenesActualizados = examenes.filter(e => e != examen);
            localStorage.setItem("examenes", JSON.stringify(examenesActualizados));
            location.reload(); // Recargo la pagina
        });
    

        // Evento para realizar el examen 
        botonInsertar.addEventListener("click", () => {
            //Guardo el nombre del examen seleccionado y redirecciono a la pagina donde se va a realizar
            localStorage.setItem("examen", nombre);
            window.location.href = "intentarExamen.html";
            
        });


    });

    // Boton Crear Examen
        botonCrearExamen.addEventListener("click", () => {
        window.location.href = "editarExamen.html";
    });

    // Botón Volver
    botonVolver.addEventListener("click", () => {
        window.location.href = "elegirExamen.html";
    });

    // Botón Salir
    botonSalir.addEventListener("click", function () {
        window.location.href = "index.html";
    });

});

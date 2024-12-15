window.addEventListener("DOMContentLoaded", function () {

    // Referencias a los elementos clave
    let mostrarRol = document.getElementById("rol");
    let gestionDiv = document.getElementById("gestion").querySelector("div");
    let botonCrearExamen = document.getElementById("crearPregunta"); // Botón Crear Examen
    let rol = localStorage.getItem("rolSesion");

    // Guardar los botones del Footer de Volver y Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");

    // Si no hay rol, redirige a la página de inicio de sesión
    if (!rol) {
        window.location.href = "index.html";
        return;
    }

    

    // Mostrar rol en la página
    let mensajeRol = document.createElement("a");
    mensajeRol.style.color = "green";
    mensajeRol.textContent = rol;
    mostrarRol.append(mensajeRol);

    // Recuperar exámenes del localStorage
    let examenes = JSON.parse(localStorage.getItem("examenes")) || [];

    // Si no hay exámenes, muestra un mensaje
    if (examenes.length === 0) {
        let mensaje = document.createElement("p");
        mensaje.textContent = "No hay exámenes disponibles.";
        gestionDiv.appendChild(mensaje);
        return;
    }

    // Crear dinámicamente los detalles para cada examen
    examenes.forEach(examen => {
        // Dividir los datos del examen
        let nombre = examen.split("|")[0];
        let descripcion = examen.split("|")[1];
        let categoria = examen.split("|")[2];

        let preguntas = examen.split("|")[3].split("~"); // Convertir las preguntas en un array

        // Crear el elemento <details>
        let details = document.createElement("details");

        // Crear el <summary> con el nombre del examen
        let summary = document.createElement("summary");
        summary.textContent = nombre;
        details.appendChild(summary);

        // Crear un párrafo con la descripción del examen
        let descripcionP = document.createElement("p");
        descripcionP.textContent = `Descripción: ${descripcion}`;
        descripcionP.style.color = "black"
        details.appendChild(descripcionP);

        // Crear un párrafo con la categoría del examen
        let categoriaP = document.createElement("p");
        categoriaP.textContent = `Categoría: ${categoria}`;
        categoriaP.style.fontWeight = "bolder";
        categoriaP.style.textDecoration = "underline";
        details.appendChild(categoriaP);

        // Crear un párrafo con la cantidad de preguntas
        let preguntasP = document.createElement("p");
        preguntasP.textContent = `Número de preguntas: ${preguntas.length}`;
        details.appendChild(preguntasP);

        // Crear los botones "Intentar" y "Borrar"
        let intentarBtn = document.createElement("button");
        intentarBtn.textContent = "Intentar";
        intentarBtn.className = "intentar";
        
        let borrarBtn = document.createElement("button");
        borrarBtn.textContent = "Borrar";
        borrarBtn.className = "borrar";
        

        // Agregar los botones al <details>
        details.appendChild(intentarBtn);
        if(rol != "Alumno"){details.appendChild(borrarBtn);}
        

        // Agregar el <details> al contenedor principal
        gestionDiv.appendChild(details);

        
        // Evento para borrar el examen
        borrarBtn.addEventListener("click", () => {
            // Filtrar el examen actual del array de exámenes
            let examenesActualizados = examenes.filter(e => e !== examen);
            localStorage.setItem("examenes", JSON.stringify(examenesActualizados));
            alert("Examen eliminado correctamente.");
            location.reload(); // Recargar la página
        });
    

        // Evento para intentar el examen (puedes personalizarlo)
        intentarBtn.addEventListener("click", () => {
            alert(`Iniciando el examen: ${nombre}`);
            localStorage.setItem("examen", nombre);
            this.window.location.href = "intentarExamen.html";
            // Aquí puedes redirigir a una página de intento de examen
        });
    });

    // Redirigir al usuario a la página "editarExamen.html" al hacer clic en "Crear Examen"
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

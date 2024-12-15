window.addEventListener("DOMContentLoaded", function () {

    let preguntasContainer = document.getElementById("preguntasContainer");
    let botonTerminarIntento = document.getElementById("terminarIntento");

    let mostrarRol = document.getElementById("rol");
    let rol = localStorage.getItem("rolSesion");

    if (!rol) {
        window.location.href = "index.html";
    } else {
        let mensajeRol = document.createElement("a");
        mensajeRol.style.color = "green";
        mensajeRol.textContent = rol;
        mostrarRol.append(mensajeRol);
    }

    // Cargar preguntas desde localStorage
    let preguntas = JSON.parse(localStorage.getItem("preguntas"));
    if(preguntas == null){
            alert("Error al cargar las preguntas");
            window.location.href("GestionExamen.html");
        
    }

    console.log(preguntas);

    let examenes = JSON.parse(localStorage.getItem("examenes"));
    if(examenes == null){
        alert("Error al el examen 1");
        window.location.href("GestionExamen.html");
    
}

    let tituloExamen = localStorage.getItem("examen");
    if(tituloExamen == null){
        alert("Error el examenes 2");
        window.location.href("GestionExamen.html");
}


    let preguntasExamen;
    let respuestas = [];
    examenes.forEach(examen => {
        console.log(examen.split("|")[0] == tituloExamen);
        if(examen.split("|")[0] == tituloExamen){ 
            console.log("AA " + examen.split("|")[3]);
            
        preguntasExamen = examen.split("|")[3].split("~");        
        console.log("Preguntas Examen: " + preguntasExamen);

        preguntas.forEach(pregunta => {
            console.log(pregunta.split("|").slice(2,5)); //Respuestas de cada pregunta
            let a  = pregunta.split("|").slice(2,5);

            a.forEach(ar => {
                respuestas.push(ar)
            });
            
            //console.log(preguntasExamen);
            
        });
        console.log(respuestas);
        
        }

    });

    // Mostrar título del examen
    document.getElementById("tituloExamen").textContent = `Intentar Examen: ${tituloExamen}`;

    let index = 0;
    // Crear dinámicamente preguntas
    preguntasExamen.forEach((pregunta) => {
        
        let preguntaDiv = document.createElement("div");
        // Crear etiqueta de pregunta
        let preguntaTitulo = document.createElement("p");
        preguntaTitulo.textContent = pregunta;
        preguntaDiv.appendChild(preguntaTitulo);

        // Crear opciones
        for (let i = 1; i <= 3; i++) {
            
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = pregunta;
            radio.id = pregunta + index;
            radio.value = i;

            let label = document.createElement("label");
            label.setAttribute("for", pregunta + index);
            label.textContent = respuestas[index];

            preguntaDiv.appendChild(radio);
            preguntaDiv.appendChild(label);

            index++;
        }

        preguntasContainer.appendChild(preguntaDiv);
    });

    // Manejar botón "Terminar Intento"
    botonTerminarIntento.addEventListener("click", () => {
        let respuestasCorrectas = [];
        let respuestasIncorrectas = [];

        let index2 = 0;
        preguntas.forEach((pregunta) => {
            let respuestas = document.getElementsByName(`respuesta${index2}`);
            let respuestaSeleccionada;

            // Verificar cuál está seleccionada
            respuestas.forEach((radio) => {
                if (radio.checked) {
                    respuestaSeleccionada = parseInt(radio.value);
                }
            });

            // Comparar con la respuesta correcta
            if (respuestaSeleccionada === pregunta.correcta) {
                respuestasCorrectas.push(index2);
            } else {
                respuestasIncorrectas.push(index2);
            }
            index2++;
        });

        // Marcar respuestas correctas e incorrectas
        respuestasCorrectas.forEach((index) => {
            document.getElementsByName(`respuesta${index}`).forEach((radio) => {
                radio.parentElement.style.backgroundColor = "#d4edda"; // Verde
            });
        });

        respuestasIncorrectas.forEach((index) => {
            document.getElementsByName(`respuesta${index}`).forEach((radio) => {
                radio.parentElement.style.backgroundColor = "#f8d7da"; // Rojo
            });
        });
    });


});

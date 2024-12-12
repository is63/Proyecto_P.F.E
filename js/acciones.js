window.addEventListener("DOMContentLoaded", function(){



    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");


    botonVolver.addEventListener("click", () =>{
        window.location.href = "rol.html";
    });

    botonSalir.addEventListener("click", function(){
        window.location.href = "index.html";

    });
});
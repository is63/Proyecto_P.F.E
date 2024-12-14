window.addEventListener("DOMContentLoaded", function(){

    //Selecciono los botones del footer de Volver, Salir
    let botonVolver = document.getElementById("botonVolver");
    let botonSalir = document.getElementById("botonSalir");


    //Recupero el rol seleccionado en la página anterior
    let rol = this.localStorage.getItem("rolSesion");

    //si esta vacio o no existe, hago una redireccion al index para que inicie Sesion
    if (rol == "" || rol == undefined) {
        window.location.href = "index.html";
    }





    //  Boton de Volver del Footer  //
    botonVolver.addEventListener("click", () =>{
        //redirecciono a la página anterior
        window.location.href = "elegirExamen.html"; //no uso window.history.back(), por si viene de una pagina siguiente
    });

    //  Boton de Salir del Footer  //
    botonSalir.addEventListener("click", function(){
        //redirecciono al index para que se reescriva el localStorage de ususarioSesion y vuelva a iniciar Sesion
        window.location.href = "index.html";

    });

});
window.addEventListener("DOMContentLoaded", function(){

    //Guardo los div donde voy a mostrar los usuarios
    let mostrarValidados = this.document.getElementById("verificados");
    console.log(mostrarValidados);
    
    let mostrarNoValidados = this.document.getElementById("noVerificados");

    //Consaigo el array de ususarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    
    let validados = [];
    let noValidados = [];
    

    usuarios.forEach(usuario =>{
        if (usuario.validado){
            let nuevoLista = this.document.createElement("p");
            nuevoLista.textContent = `${usuario.nombre} |  rol: ${usuario.rol}`;
            let boton = this.document.createElement("input");
            boton.setAttribute("type", "checkbox");
            boton.setAttribute("checked", "checked");
            nuevoLista.appendChild(boton)
            mostrarValidados.appendChild(nuevoLista);
            
            validados.push(usuario);
            console.log(usuario);
            
        }
        else{

            let nuevoLista = this.document.createElement("p");
            nuevoLista.textContent = `${usuario.nombre} |  rol: ${usuario.rol}`;
            let boton = this.document.createElement("input");
            boton.setAttribute("type", "checkbox");
            nuevoLista.appendChild(boton)
            mostrarNoValidados.appendChild(nuevoLista);
            

            noValidados.push(usuario);
            console.log(usuario);
            
        }
    });

    console.log(validados);
    console.log(noValidados);
    
    


});
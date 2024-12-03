class Usuario {
    constructor(nombre, contrasena, rol) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.rol = rol;
        this.validado = false
    }

    getInfo() {
        return `Nombre: ${this.nombre},
Contraseña: ${this.contrasena},
Rol: ${this.rol},
Validado: ${this.validado}`;
    }

    getValidado() {
        return this.validado;
    }

    validar() {
        this.validado = true;
    }
}

let usuarioAdmin = new Usuario("admin", "admin", "admin");
usuarioAdmin.validar();

let usuarios = [];
usuarios.push(usuarioAdmin);

//escribir
localStorage.setItem("usuarios", JSON.stringify(usuarios));

//leer
console.log(JSON.parse(localStorage.getItem("usuarios")));
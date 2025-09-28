class UserDTO {
    constructor(uid, nombre, apellido, email, fechaNacimiento, genero, deporteFavorito, nivelExperiencia, fechaRegistro) {
        this.uid = uid;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.deporteFavorito = deporteFavorito;
        this.nivelExperiencia = nivelExperiencia;
        this.fechaRegistro = fechaRegistro
    }
}

module.exports = UserDTO;
class UserDTO {
    constructor(
        uid,
        nombre,
        apellido,
        email,
        fechaNacimiento,
        genero,
        deporteFavorito,
        nivelExperiencia,
        fechaRegistro,
        rutas = [],
        eventos = [],
        avatar = "",

        expoPushToken = "",
        notifications = { enabled: true, onEventJoin: true, onEventCancelled: true }
    ) {
        this.uid = uid;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.deporteFavorito = deporteFavorito;
        this.nivelExperiencia = nivelExperiencia;
        this.fechaRegistro = fechaRegistro;

        // NEW
        this.rutas = Array.isArray(rutas) ? rutas : [];
        this.eventos = Array.isArray(eventos) ? eventos : [];
        this.avatar = typeof avatar === 'string' ? avatar : "";
        this.expoPushToken = typeof expoPushToken === 'string' ? expoPushToken : "";
        this.notifications = {
            enabled: notifications?.enabled ?? true,
            onEventJoin: notifications?.onEventJoin ?? true,
            onEventCancelled: notifications?.onEventCancelled ?? true
        };
    }
}

module.exports = UserDTO;

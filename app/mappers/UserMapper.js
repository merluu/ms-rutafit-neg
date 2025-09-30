const User = require('../domains/User');
const UserDTO = require('../dtos/UserDTO');

class UserMapper {

    toDomain(dto) {
        // Si no viene retornar nulo por defecto
        if (!dto) return null;

        return new User(
            dto.uid,
            dto.nombre,
            dto.apellido,
            dto.email,
            dto.fechaNacimiento,
            dto.genero,
            dto.deporteFavorito,
            dto.nivelExperiencia,
            dto.fechaRegistro || new Date());
    }

    toDTO(domain) {
        // Si no viene retornar nulo por defecto
        if (!domain) return null;

        // Convierte la fecha a la zona horaria de Chile (GMT-3)
        let fechaRegistroChile = null;
        if (domain.fechaRegistro) {
            const fecha = new Date(domain.fechaRegistro);
            // Resta 3 horas para convertir de UTC a Chile
            fecha.setHours(fecha.getHours() - 3);
            fechaRegistroChile = fecha.toISOString();
        }

        return new UserDTO(
            domain._id,
            domain.nombre,
            domain.apellido,
            domain.email,
            domain.fechaNacimiento,
            domain.genero,
            domain.deporteFavorito,
            domain.nivelExperiencia,
            fechaRegistroChile);
    }

}

module.exports = UserMapper;
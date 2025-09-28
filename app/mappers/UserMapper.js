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

        return new UserDTO(
            domain._id,
            domain.nombre,
            domain.apellido,
            domain.email,
            domain.fechaNacimiento,
            domain.genero,
            domain.deporteFavorito,
            domain.nivelExperiencia,
            domain.fechaRegistro);
    }

}

module.exports = UserMapper;
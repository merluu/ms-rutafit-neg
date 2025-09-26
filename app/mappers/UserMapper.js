const User = require('../domains/User');
const UserDTO = require('../dtos/UserDTO');

class UserMapper {

    toDomain(dto) {
        // Si no viene retornar nulo por defecto
        if (!dto) return null;

        return new User(dto.rut, dto.nombre, dto.edad);
    }

    toDTO(domain) {
        // Si no viene retornar nulo por defecto
        if (!domain) return null;

        return new UserDTO(domain.rut, domain.nombre, domain.edad);
    }

}

module.exports = UserMapper;
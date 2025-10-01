const ParametersError = require('../errors/ParametersError');
const UserDTO = require('../dtos/UserDTO');
const UserService = require('../services/UserService')
const UserMapper = require('../mappers/UserMapper')

class UserController {


    async save(req, res, next) {
        try {
            console.info(`${new Date().toISOString()} [UserController] [save] [START] Save`);

            const data = req.body;

            const userDTO = new UserDTO(
                data.uid,
                data.nombre,
                data.apellido,
                data.email,
                data.fechaNacimiento,
                data.genero,
                data.deporteFavorito,
                data.nivelExperiencia);
            const userService = new UserService();
            const userMapper = new UserMapper();

            await userService.save(userMapper.toDomain(userDTO));

            console.info(`${new Date().toISOString()} [UserController] [save] [END] Save`);
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const userService = new UserService();
            const users = await userService.findAll();
            const userMapper = new UserMapper();

            // esta linea transforma la lista de usuarios de dominio a una lista de usuarios dto
            const usersDTO = users.map(user => userMapper.toDTO(user));

            res.status(200).json(usersDTO);
        } catch (error) {
            next(error);
        }
    }

    async findByUid(req, res, next) {
        try {
            const { uid } = req.params;
            if (!uid || typeof uid !== 'string' || uid.trim() === '') {
                throw new ParametersError('El parámetro uid es requerido.');
            }

            const userService = new UserService();
            const user = await userService.findByUid(uid);

            if (!user) {
                return res.status(404).json({ message: `Usuario con uid ${uid} no encontrado` });
            }

            const userMapper = new UserMapper();
            const dto = userMapper.toDTO(user);
            return res.status(200).json(dto);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = UserController;
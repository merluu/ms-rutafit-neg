const UserRepository = require('../repositories/UserRepository');

class UserService {

    async save(userDTO) {
        console.info(`${new Date().toISOString()} [UserService] [save] [START] Save [${JSON.stringify(userDTO)}]`);
        // Implementation to save userDTO

        const userRepository = new UserRepository();
        await userRepository.save(userDTO);

        console.info(`${new Date().toISOString()} [UserService] [save] [END] Save`);
    }

    async findAll() {
        console.info(`${new Date().toISOString()} [UserService] [findAll] [START] Find All`);
        const userRepository = new UserRepository();
        const users = await userRepository.findAll();
        console.info(`${new Date().toISOString()} [UserService] [findAll] [END] Find All [${users.length}]`);
        return users;
    }
}

module.exports = UserService;
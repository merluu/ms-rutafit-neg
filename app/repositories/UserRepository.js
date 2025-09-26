const MongoDBClientUser = require('../clients/MongoDBClientUser')

class UserRepository {

    async save(user) {
        console.info(`${new Date().toISOString()} [UserRepository] [save] [START] Save [${JSON.stringify(user)}]`);

        const mongoDBClientUser = new MongoDBClientUser();
        await mongoDBClientUser.save(user);
        console.info(`${new Date().toISOString()} [UserRepository] [save] [END] Save`);
    }

    async findAll() {
        console.info(`${new Date().toISOString()} [UserRepository] [findAll] [START] Find All`);
        const mongoDBClientUser = new MongoDBClientUser();
        const users = await mongoDBClientUser.findAll();
        console.info(`${new Date().toISOString()} [UserRepository] [findAll] [END] Find All [${users.length}]`);
        return users;
    }
}

module.exports = UserRepository;
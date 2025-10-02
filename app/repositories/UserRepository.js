const MongoDBClientUser = require('../clients/MongoDBClientUser')

class UserRepository {

    async save(user) {
        console.info(`${new Date().toISOString()} [UserRepository] [save] [START] Save [${JSON.stringify(user)}]`);

        const mongoDBClientUser = new MongoDBClientUser();
        const { uid, ...userWithoutUid } = user;
        const userToSave = { ...userWithoutUid, _id: uid };
        await mongoDBClientUser.save(userToSave);
        console.info(`${new Date().toISOString()} [UserRepository] [save] [END] Save`);
    }

    async findAll() {
        console.info(`${new Date().toISOString()} [UserRepository] [findAll] [START] Find All`);
        const mongoDBClientUser = new MongoDBClientUser();
        const users = await mongoDBClientUser.findAll();
        console.info(`${new Date().toISOString()} [UserRepository] [findAll] [END] Find All [${users.length}]`);
        return users;
    }

    async findByUid(uid) {
        console.info(`${new Date().toISOString()} [UserRepository] [findByUid] [START] uid=${uid}`);
        const mongoDBClientUser = new MongoDBClientUser();
        const user = (mongoDBClientUser.findById)
            ? await mongoDBClientUser.findById(uid)
            : await mongoDBClientUser.findOne({ _id: uid });

        console.info(`${new Date().toISOString()} [UserRepository] [findByUid] [END] ${user ? 'FOUND' : 'NOT_FOUND'}`);
        return user || null;
    }

    async update(uid, partialData) {
        console.info(`${new Date().toISOString()} [UserRepository] [update] [START] uid=${uid}`);

        const mongoDBClientUser = new MongoDBClientUser();

        // Defensa extra: jamás enviar estos campos al $set
        const { uid: _u, _id, email, fechaRegistro, ...safe } = partialData;

        const result = await mongoDBClientUser.update(uid, safe);
        if (result.matchedCount === 0) return null;

        const fresh = await mongoDBClientUser.findById(uid);
        console.info(`${new Date().toISOString()} [UserRepository] [update] [END]`);
        return fresh;
    }


}

module.exports = UserRepository;
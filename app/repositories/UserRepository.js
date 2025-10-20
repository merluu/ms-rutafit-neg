const MongoDBClientUser = require('../clients/MongoDBClientUser')

class UserRepository {

    async save(user) {
        const mongoDBClientUser = new MongoDBClientUser();
        const { uid, ...userWithoutUid } = user;

        const rutas = Array.isArray(userWithoutUid.rutas) ? userWithoutUid.rutas : [];
        const eventos = Array.isArray(userWithoutUid.eventos) ? userWithoutUid.eventos : [];
        const avatar = typeof userWithoutUid.avatar === 'string' ? userWithoutUid.avatar : "";
        const expoPushToken = typeof userWithoutUid.expoPushToken === 'string' ? userWithoutUid.expoPushToken : "";
        const notifications = {
            enabled: userWithoutUid.notifications?.enabled ?? true,
            onEventJoin: userWithoutUid.notifications?.onEventJoin ?? true,
            onEventCancelled: userWithoutUid.notifications?.onEventCancelled ?? true,
        };

        const userToSave = { ...userWithoutUid, rutas, eventos, avatar, expoPushToken, notifications, _id: uid };
        await mongoDBClientUser.save(userToSave);
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

        // NEW: normalizar tipos si vienen
        if (safe.rutas !== undefined && !Array.isArray(safe.rutas)) delete safe.rutas;
        if (safe.eventos !== undefined && !Array.isArray(safe.eventos)) delete safe.eventos;
        if (safe.avatar !== undefined && typeof safe.avatar !== 'string') delete safe.avatar;
        if (safe.expoPushToken !== undefined && typeof safe.expoPushToken !== 'string') delete safe.expoPushToken;
        if (safe.notifications !== undefined) {
            const n = safe.notifications;
            safe.notifications = {
                enabled: n?.enabled ?? true,
                onEventJoin: n?.onEventJoin ?? true,
                onEventCancelled: n?.onEventCancelled ?? true
            };
        }

        const result = await mongoDBClientUser.update(uid, safe);
        if (result.matchedCount === 0) return null;

        const fresh = await mongoDBClientUser.findById(uid);
        console.info(`${new Date().toISOString()} [UserRepository] [update] [END]`);
        return fresh;
    }
}

module.exports = UserRepository;

// services/PushService.js
const { Expo } = require('expo-server-sdk');

class PushService {
    constructor() {
        this.expo = new Expo();
    }

    // tokens: string[] (Expo push tokens)
    async sendNotifications(messages = []) {
        // messages: [{ to, title, body, data? }]
        const valid = messages.filter(m => Expo.isExpoPushToken(m.to));
        if (!valid.length) return { tickets: [], receipts: [] };

        const chunks = this.expo.chunkPushNotifications(valid);
        const tickets = [];
        for (const chunk of chunks) {
            try {
                const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (e) {
                console.error('[PushService] send error:', e);
            }
        }
        return { tickets };
    }
}

module.exports = new PushService();

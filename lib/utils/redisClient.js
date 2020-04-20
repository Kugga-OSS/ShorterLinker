"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const settings_1 = require("settings");
class RedisTool {
    static getClient() {
        if (!this.redisclient) {
            this.redisclient = redis.createClient(settings_1.settings.REDIS_PORT, settings_1.settings.REDIS_HOST, { password: settings_1.settings.REDIS_PASS });
            this.redisclient.on('error', (err) => {
                console.log(('errorevent - ' + settings_1.settings.REDIS_HOST + ':' + settings_1.settings.REDIS_PORT + ' - ' + err));
            });
            return this.redisclient;
        }
        else {
            return this.redisclient;
        }
    }
}
exports.RedisTool = RedisTool;
//# sourceMappingURL=redisClient.js.map
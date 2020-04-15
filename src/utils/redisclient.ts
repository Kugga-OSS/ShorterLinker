import * as redis from 'redis';
import { settings } from 'settings'

export class RedisTool {
    public static redisclient: redis.RedisClient;

    public static getClient(): redis.RedisClient {
        if (this.redisclient === null) {
            this.redisclient = redis.createClient(settings.REDIS_PORT, settings.REDIS_HOST)
            this.redisclient.on('error', (err) => {
                console.log(('errorevent - ' + settings.REDIS_HOST + ':' + settings.REDIS_PORT + ' - ' + err));
            })
        }
        return this.redisclient;
    }

}
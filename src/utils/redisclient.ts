import * as redis from 'redis';
import { settings } from 'settings'

/**
 * 为什么只用一条连接 https://stackoverflow.com/questions/21976270/node-js-redis-connection-pooling
 */
export class RedisTool {
    public static redisclient: redis.RedisClient;

    public static getClient(): redis.RedisClient {
        if (!this.redisclient) {
            this.redisclient = redis.createClient(settings.REDIS_PORT, settings.REDIS_HOST, {password: settings.REDIS_PASS})
            this.redisclient.on('error', (err) => {
                console.log(('errorevent - ' + settings.REDIS_HOST + ':' + settings.REDIS_PORT + ' - ' + err));
            })
            return this.redisclient;
        } else {
            return this.redisclient;
        }
    }

}
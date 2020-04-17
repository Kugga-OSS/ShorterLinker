import * as mysql from 'mysql'
import { settings } from 'settings';

export class mysqlClient {
    public static pool: mysql.Pool = mysql.createPool({
        host: settings.MYSQL_HOST,
        user: settings.MYSQL_USER,
        password: settings.MYSQL_PASSWORD,
        port: settings.MYSQL_PORT,
        database: settings.MYSQL_DB,
        connectTimeout: 5000,
    });
}
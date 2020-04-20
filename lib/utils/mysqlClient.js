"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const settings_1 = require("settings");
class mysqlClient {
}
exports.mysqlClient = mysqlClient;
mysqlClient.pool = mysql.createPool({
    host: settings_1.settings.MYSQL_HOST,
    user: settings_1.settings.MYSQL_USER,
    password: settings_1.settings.MYSQL_PASSWORD,
    port: settings_1.settings.MYSQL_PORT,
    database: settings_1.settings.MYSQL_DB,
    connectTimeout: 5000,
});
//# sourceMappingURL=mysqlClient.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlClient_1 = require("utils/mysqlClient");
const base62util_1 = require("utils/base62util");
const settings_1 = require("settings");
const ifExistSQL = 'select * from kugga_links where longer_link = ?';
const setStepSQL = 'set session auto_increment_increment = 10;';
const updateIdSQL = 'insert into kugga_id_generator() values ()';
const getLastInsertIdSQL = 'select last_insert_id() as id';
const insertRecordSQL = 'insert into kugga_links(longer_link, shorter_link) values(?, ?)';
exports.l2s = (request, response) => {
    const body = request.body;
    let resbody = { shortLink: "", message: "" };
    mysqlClient_1.mysqlClient.pool.getConnection((err, conn) => {
        conn.query(ifExistSQL, body.longLink, (err, res) => {
            if (err)
                throw err;
            if (res.length != 0) {
                resbody = { shortLink: settings_1.settings.SERVER_HOST + res[0].shorter_link, message: "success" };
                response.send(resbody);
            }
            else {
                conn.beginTransaction((err) => {
                    if (err)
                        throw err;
                    conn.query(setStepSQL);
                    conn.query(updateIdSQL);
                    conn.query(getLastInsertIdSQL, (err, res, fileds) => {
                        if (err)
                            throw err;
                        const curId = res[0].id;
                        const suffix = base62util_1.nToBase62(curId);
                        conn.query(insertRecordSQL, [body.longLink, suffix], (err, res) => {
                            if (err)
                                throw err;
                            resbody = { shortLink: settings_1.settings.SERVER_HOST + suffix, message: "success" };
                            response.send(resbody);
                        });
                    });
                });
                conn.commit();
            }
        });
        conn.release();
    });
};
//# sourceMappingURL=caster.js.map
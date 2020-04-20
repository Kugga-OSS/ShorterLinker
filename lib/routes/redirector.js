"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlClient_1 = require("utils/mysqlClient");
const app_1 = require("app");
const selectOriginLinkSql = 'select longer_link from kugga_links where shorter_link = ?';
exports.redirect = (request, response) => {
    if (!request.params.base62url) {
        response.send({ 'message': 'error' });
        return;
    }
    mysqlClient_1.mysqlClient.pool.getConnection((err, conn) => {
        if (err)
            throw err;
        conn.query(selectOriginLinkSql, [request.params.base62url], (err, res) => {
            if (res.length == 0) {
                response.send({ 'message': 'no such link' });
                return;
            }
            else {
                response.status(302);
                response.setHeader("Location", res[0].longer_link);
                response.send();
                app_1.log.info(`rediect id : ${request.params.base62url} to ${res[0].longer_link}`);
            }
        });
        conn.release();
    });
};
//# sourceMappingURL=redirector.js.map
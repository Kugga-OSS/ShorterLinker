"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient_1 = require("utils/redisClient");
const app_1 = require("app");
const nginxPassHeader = 'x-forwarded-for';
exports.banIp = (request, response, next) => {
    if (request.headers[nginxPassHeader]) {
        checkIp(String(request.headers[nginxPassHeader]), next);
    }
    else {
        checkIp(String(request.connection.remoteAddress), next);
    }
};
function checkIp(ip, next) {
    let conn = redisClient_1.RedisTool.getClient();
    conn.hgetall(ip, (err, res) => {
        if (err)
            throw err;
        if (res) {
            const tmp = res;
            const prevTime = new Date(tmp.lastVisitTime);
            const time = Number(tmp.time);
            const curTime = new Date();
            if (curTime.getMinutes() !== prevTime.getMinutes() || curTime.getHours() !== prevTime.getHours() || curTime.getDay() !== prevTime.getDay()) {
                conn.hmset(ip, 'lastVisitTime', String(curTime), 'time', 1);
                app_1.log.info(`@pass : pass ip ${ip} , time ${time}`);
                next();
            }
            else {
                if (time < 60) {
                    conn.hmset(ip, 'time', time + 1);
                    app_1.log.info(`@pass : pass ip ${ip} , time ${time}`);
                    next();
                }
                else {
                    app_1.log.info(`@reject : reject ip ${ip}`);
                }
            }
        }
        else {
            let ipRecord = { lastVisitTime: String(new Date()), time: 1 };
            conn.hmset(ip, 'lastVisitTime', ipRecord.lastVisitTime, 'time', ipRecord.time);
            next();
        }
    });
}
//# sourceMappingURL=checkIpMiddleware.js.map
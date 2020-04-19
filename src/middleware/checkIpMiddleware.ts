import * as Express from 'express';
import { RedisTool } from 'utils/redisClient';
import { log } from 'app';
// import { log } from "app"

const nginxPassHeader = 'x-forwarded-for';

interface ipRecord {
    lastVisitTime: string,
    time: number
}

/**
 * @description ip黑名单
 * @param request 
 * @param response 
 * @param next 
 * @todo 黑名单封禁
 */
export const banIp = (request: Express.Request, response: Express.Response, next: any) => {
    // console.log(request.connection.remoteAddress);
    // 因为是通过nginx转发，所以需要记录转发前的远程ip地址，否则全部都是localhost
    // console.log(request.headers[nginxPassHeader]);

    if (request.headers[nginxPassHeader]) {
        checkIp(String(request.headers[nginxPassHeader]), next);
    } else {
        // 如果程序意外，没有获得nginx转发后的 x-forwarded-for 头部字段，则直接使用 remote-addr 字段
        checkIp(String(request.connection.remoteAddress), next);
    }
}

function checkIp(ip: string, next: Express.NextFunction) {
    let conn = RedisTool.getClient();
    conn.hgetall(ip, (err, res: ipRecord | any) => {
        if (err) throw err;
        if (res) {
            const tmp: ipRecord = res;
            const prevTime = new Date(tmp.lastVisitTime);
            // 这里的 typescript 很坑啊，一个number类型的变量在运行时被修改成了string，但是程序却没有报错
            const time = Number(tmp.time);
            const curTime = new Date();
            // 要是不是同一分钟，那么一定不符合限流要求，放开次数限制，更新时间
            if (curTime.getMinutes() !== prevTime.getMinutes() || curTime.getHours() !== prevTime.getHours() || curTime.getDay() !== prevTime.getDay()) {
                conn.hmset(ip, 'lastVisitTime', String(curTime), 'time', 1);
                log.info(`@pass : pass ip ${ip} , time ${time}`);
                next();
            } else {
                // 次数未达到限制
                if (time < 60) {
                    conn.hmset(ip, 'time', time + 1);
                    log.info(`@pass : pass ip ${ip} , time ${time}`);
                    next()
                } else {
                    // reject;
                    log.info(`@reject : reject ip ${ip}`);
                }
            }
        } else {
            let ipRecord: ipRecord = { lastVisitTime: String(new Date()), time: 1 };
            conn.hmset(ip, 'lastVisitTime', ipRecord.lastVisitTime, 'time', ipRecord.time);
            next();
        }
    });
}
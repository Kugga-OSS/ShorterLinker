import * as Express from 'express';
// import { RedisTool } from 'utils/redisClient';
// import { log } from "app"

/**
 * @description ip黑名单
 * @param request 
 * @param response 
 * @param next 
 */
export const banIp = (request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
    console.log(request.connection.remoteAddress);
    // let conn = RedisTool.getClient();
    console.log(request.headers['x-forwarded-for']);
    next();
}
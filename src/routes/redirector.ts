import * as Express from 'express';
import { mysqlClient } from 'utils/mysqlClient';
import { log } from 'app';

const selectOriginLinkSql = 'select longer_link from kugga_links where shorter_link = ?'

interface LongLink {
    longer_link: string
}

/**
 * @desc 为储存了的短链接提供重定向到源地址
 * @param request 
 * @param response 
 */
export const redirect = (request: Express.Request, response: Express.Response) => {
    if (!request.params.base62url) {
        response.send({'message': 'error'});
        return;
    }
    mysqlClient.pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(selectOriginLinkSql, [request.params.base62url], (err, res: Array<LongLink>) => {
            if (res.length == 0) {
                response.send({'message': 'no such link'});
                return ;
            } else {
                response.status(302);
                response.setHeader("Location", res[0].longer_link);
                response.send();
                log.info(`rediect id : ${request.params.base62url} to ${res[0].longer_link}`)               
            }
        })
    })
}
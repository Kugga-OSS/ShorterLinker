import * as Express from 'express'
// import { RedisTool } from 'utils/redisClient'
// import { nToBase62 } from 'utils/base62util';
import { mysqlClient } from 'utils/mysqlClient';
import { nToBase62 } from 'utils/base62util';
import { settings } from 'settings';

interface l2sBody {
    longLink: string,
}

interface resBody {
    shortLink: string,
    message: string,
}

const ifExistSQL = 'select * from kugga_links where longer_link = ?'

const setStepSQL = 'set session auto_increment_increment = 10;';

const updateIdSQL = 'insert into kugga_id_generator() values ()';

const getLastInsertIdSQL = 'select last_insert_id() as id';

const insertRecordSQL = 'insert into kugga_links(longer_link, shorter_link) values(?, ?)'

/**
 *  POST body { longLink: ''}
 * @description 将长网址转化为短网址，短网址的格式xx.xx/10进制数据库主键，转化为62进制的字符串 
 * @param request  
 * @param res 
 * @todo 1. 入参错误处理
 */
export const l2s = (request: Express.Request, response: Express.Response) => {
    const body: l2sBody = request.body;
    let resbody: resBody = { shortLink: "", message: "" };
    mysqlClient.pool.getConnection((err, conn) => {
        // 先查数据库，是否已经有了这条长链接的映射
        conn.query(ifExistSQL, body.longLink, (err, res) => {
            if (err) throw err;
            // 已经有了，则直接返回短链接
            if (res.length != 0) {
                resbody = { shortLink: settings.SERVER_HOST + res[0].shorter_link, message: "success" };
                response.send(resbody);
            } else {
                // 没有这条长链接映射，增加
                conn.beginTransaction((err) => {
                    if (err) throw err;
                    // 设置步长
                    conn.query(setStepSQL);
                    // 更新Id
                    conn.query(updateIdSQL)
                    // 获取Id
                    conn.query(getLastInsertIdSQL, (err, res, fileds) => {
                        if (err) throw err;
                        const curId = res[0].id;
                        // 转化为62进制
                        const suffix = nToBase62(curId);
                        // 插入链接映射表
                        conn.query(insertRecordSQL, [body.longLink, suffix], (err, res) => {
                            if (err) throw err;
                            resbody = { shortLink: settings.SERVER_HOST + suffix, message: "success" };
                            response.send(resbody);
                        });
                    })
                })
                conn.commit();
            }
        })
    })
}
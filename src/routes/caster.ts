import * as Express from 'express'
// import { RedisTool } from 'utils/redisClient'
// import { nToBase62 } from 'utils/base62util';
import { mysqlClient } from 'utils/mysqlClient';
import { nToBase62 } from 'utils/base62util';
import { settings } from 'settings';

interface l2sBody {
    longerLink: string,
}

interface resBody {
    shorterLink: string,
    message: string,
}

const ifExist = 'select * from kugga_links where longer_link = ?'
const setStep = 'set session auto_increment_increment = 10;';
const updateId = 'insert into kugga_id_generator() values ()';
const getLastInsertId = 'select last_insert_id() as id';
const insertRecord = 'insert into kugga_links(longer_link, shorter_link) values(?, ?)'

/**
 *  POST body { longerLink: ''}
 * @description 将长网址转化为短网址，短网址的格式xx.xx/10进制数据库主键，转化为62进制的字符串 
 * @param request  
 * @param res 
 */
export const l2s = (request: Express.Request, response: Express.Response) => {
    const body: l2sBody = request.body;
    let resbody: resBody = { shorterLink: "", message: "" };
    mysqlClient.pool.getConnection((err, conn) => {
        // 先查数据库，是否已经有了这条长链接的映射
        conn.query(ifExist, body.longerLink, (err, res) => {
            if (err) throw err;
            // 已经有了，则直接返回短链接
            if (res.length != 0) {
                resbody = { shorterLink: settings.SERVER_HOST + res[0].shorter_link, message: "success" };
                response.send(resbody);
            } else {
                // 没有这条长链接映射，增加
                conn.beginTransaction((err) => {
                    if (err) throw err;
                    // 设置步长
                    conn.query(setStep);
                    // 更新Id
                    conn.query(updateId)
                    // 获取Id
                    conn.query(getLastInsertId, (err, res, fileds) => {
                        if (err) throw err;
                        const curId = res[0].id;
                        // 转化为62进制
                        const suffix = nToBase62(curId);
                        // 插入链接映射表
                        conn.query(insertRecord, [body.longerLink, suffix], (err, res) => {
                            if (err) throw err;
                            resbody = { shorterLink: settings.SERVER_HOST + suffix, message: "success" };
                            response.send(resbody);
                        });
                    })
                })
                conn.commit();
            }
        })
    })
}
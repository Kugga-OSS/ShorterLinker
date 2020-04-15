import * as Express from 'express'
import { RedisTool } from 'utils/redisclient'
import { nTo62 } from 'utils/base62util';


/**
 *  POST body { origin: '' , expireTime: ''}
 * @description 将长网址转化为短网址，短网址的格式xx.xx/10进制数据库主键，转化为62进制的字符串 
 * @param req  
 * @param res 
 */
export const l2s = (req: Express.Request, res: Express.Response) => {
    let client = RedisTool.getClient();
    // 获取一个十进制ID
    let curID =  Number(client.get("CUR@ID"));
    // 将十进制ID转化为62进制数
    nTo62(curID);

}
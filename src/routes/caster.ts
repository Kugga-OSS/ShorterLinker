import * as Express from 'express'

/**
 *  POST body { origin: '' , expireTime: ''}
 * @description 将长网址转化为短网址，短网址的格式xx.xx/10进制数据库主键，转化为64进制的字符串 
 * @param req  
 * @param res 
 */
export const l2s = (req: Express.Request, res: Express.Response) => {

}
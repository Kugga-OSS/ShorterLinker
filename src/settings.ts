import * as Path from 'path';

export const settings = {
	SERVER_HOST: process.env.SERVER_HOST || 'http://localhost',
	LOG_PATH: process.env.LOG_PATH || Path.resolve(__dirname, '../log'),
	PORT: process.env.PORT || 3000,
	REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
	REDIS_HOST: process.env.REDIS_HOST || '119.23.240.115',
	REDIS_PASS: process.env.REDIS_PASS || '123',
	MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3307,
	MYSQL_HOST: process.env.MYSQL_HOST || '119.23.240.115',
	MYSQL_USER: process.env.MYSQL_USER || 'root',
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '123',
	MYSQL_DB: process.env.MYSQL_DB || 'kugga_shorterlinker' 
};

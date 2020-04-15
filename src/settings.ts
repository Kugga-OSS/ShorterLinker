import * as Path from 'path';

export const settings = {
	LOG_PATH: process.env.LOG_PATH || Path.resolve(__dirname, '../log'),
	PORT: process.env.PORT || 3000,
	PUBLIC_PATH: process.env.PUBLIC_PATH || Path.resolve(__dirname, '../public'),
	REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
	REDIS_HOST: process.env.REDIS_HOST || 'localhost',
};

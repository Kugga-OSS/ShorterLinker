import * as Path from 'path';

import * as BodyParser from 'body-parser';
import * as express from 'express';
import * as Morgan from 'morgan';
import * as Winston from 'winston';

import { settings } from 'settings';
import { initRoutes } from 'routes/routeInitializer';

export class Server {
	public app: express.Application;
	public log: Winston.LoggerInstance;
	public router: express.Router

	constructor() {
		this.app = express();
		this.setLogger();
		this.setConfig();
		this.setRoutes();
	}

	public start() {
		this.app.listen(settings.PORT);
		this.log.info(`Server started at ${settings.PORT}`);
	}

	private setConfig() {
		this.app.use(express.static('public'))
		this.app.use(BodyParser.json());
	}

	private setRoutes() {
		this.router = express.Router();
		initRoutes(this.router);
		this.app.use('/', this.router);
	}

	private setLogger() {
		// Set up application logging
		this.log = new Winston.Logger({
			transports: [
				new Winston.transports.File({
					level: 'info',
					filename: Path.resolve(settings.LOG_PATH, 'server.log'),
					handleExceptions: true,
					json: true,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					colorize: false,
				}),
				new Winston.transports.Console({
					level: 'debug',
					handleExceptions: true,
					json: false,
					colorize: true,
				}),
			],
			exitOnError: false,
		});

		// Set up HTTP request logging
		const morganOptions: Morgan.Options = {
			stream: {
				write: (message) => {
					this.log.info(message);
				},
			},
		};

		this.app.use(Morgan('combined', morganOptions));
	}
}

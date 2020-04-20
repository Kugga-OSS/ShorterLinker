"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const BodyParser = require("body-parser");
const express = require("express");
const Morgan = require("morgan");
const Winston = require("winston");
const settings_1 = require("settings");
const routeInitializer_1 = require("routes/routeInitializer");
class Server {
    constructor() {
        this.app = express();
        this.setLogger();
        this.setConfig();
        this.setRoutes();
    }
    start() {
        this.app.listen(settings_1.settings.PORT);
        this.log.info(`Server started at ${settings_1.settings.PORT}`);
    }
    setConfig() {
        this.app.use(express.static('public'));
        this.app.use(BodyParser.json());
    }
    setRoutes() {
        this.router = express.Router();
        routeInitializer_1.initRoutes(this.router);
        this.app.use('/', this.router);
    }
    setLogger() {
        this.log = new Winston.Logger({
            transports: [
                new Winston.transports.File({
                    level: 'info',
                    filename: Path.resolve(settings_1.settings.LOG_PATH, 'server.log'),
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880,
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
        const morganOptions = {
            stream: {
                write: (message) => {
                    this.log.info(message);
                },
            },
        };
        this.app.use(Morgan('combined', morganOptions));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
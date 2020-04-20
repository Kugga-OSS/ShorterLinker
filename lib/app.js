"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("server");
const app = new server_1.Server;
exports.app = app;
app.start();
const log = app.log;
exports.log = log;
//# sourceMappingURL=app.js.map
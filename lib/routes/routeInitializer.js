"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Caster = require("routes/caster");
const Redirector = require("routes/redirector");
const checkIpMiddleware_1 = require("middleware/checkIpMiddleware");
exports.initRoutes = (router) => {
    router.post('/cast', Caster.l2s);
    router.get('/:base62url', Redirector.redirect);
    router.get('/', (req, res) => {
        res.send({ 'apiVersion': '1.0.0', 'message': 'welcome to kugga-shorter-linker!' });
    });
    router.use(checkIpMiddleware_1.banIp);
};
//# sourceMappingURL=routeInitializer.js.map
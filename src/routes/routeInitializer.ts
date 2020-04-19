import * as Express from 'express';

import * as Caster from 'routes/caster'
import * as Redirector from 'routes/redirector'
import { banIp } from 'middleware/checkIpMiddleware';

export const initRoutes = (router: Express.Router) => {
	router.post('/cast', Caster.l2s);
	router.get('/:base62url', Redirector.redirect);
	router.get('/', (req, res) => {
		res.send({'apiVersion': '1.0.0', 'message': 'welcome to kugga-shorter-linker!'});
	});
	router.use(banIp)
};

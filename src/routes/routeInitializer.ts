import * as Express from 'express';

import * as Caster from 'routes/caster'
import * as Redirector from 'routes/redirector'
import { banIp } from 'middleware/checkIpMiddleware';

export const initRoutes = (router: Express.Application) => {
	router.use(banIp);
	router.post('/cast', Caster.l2s);
	router.get('/:base62url', Redirector.redirect);
};

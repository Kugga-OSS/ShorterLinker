import * as Express from 'express';

import * as Caster from 'routes/caster'
import * as Redirector from 'routes/redirector'

export const initRoutes = (app: Express.Application) => {
	app.post('cast', Caster.l2s);
	app.get('/:base62url', Redirector.redirect);
};

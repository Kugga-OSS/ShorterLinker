import * as Express from 'express';

import * as Caster from 'routes/caster'

export const initRoutes = (app: Express.Application) => {
	app.post('cast', Caster.l2s);
	
};

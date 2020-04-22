import { Router } from 'express';
import appointmentsRouter from './appointmentsRoutes';
import usersRouter from './usersRoutes';
import sessionsRouter from './sessionsRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

import { Router } from 'express';
import appointmentsRouter from './appointmentsRoutes';
import usersRouter from './usersRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;

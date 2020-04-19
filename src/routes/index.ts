import { Router } from 'express';
import appointmentsRouter from './appointmentsRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;

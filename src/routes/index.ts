import { Router } from 'express';
import DependentesController from '../app/controllers/DependentesController';
import funcionariosRouter from './funcionarios.routes';
import dependentesRouter from './dependentes.routes';

const routes = Router();


routes.use('/funcionarios', funcionariosRouter);
routes.use('/dependentes', dependentesRouter);


export default routes;

import { Router } from 'express';
import usuariosRouter from './usuarios.routes';
import cursosRouter from './cursos.routes';
import funcionariosRouter from './funcionarios.routes';
import sessionsRouter from './sessions.routes';
import treinamentosRouter from './treinamentos.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);

routes.use('/cursos', cursosRouter);

routes.use('/funcionarios', funcionariosRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/treinamentos', treinamentosRouter);

export default routes;

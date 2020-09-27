import { DeleteDateColumn, EntityRepository, getRepository } from 'typeorm';
import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import TreinamentosController from '../app/controllers/TreinamentosController';
import Treinamentos from '../app/models/Treinamentos';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import Funcionarios from '../app/models/Funcionarios';
import Cursos from '../app/models/Cursos';

const treinamentosRouter = Router();
treinamentosRouter.use(ensureAuthenticated);

treinamentosRouter.post('/', async (request, response) => {
  try {
    const { id_func, id_curso, data_treino } = request.body;

    const treinamentosController = new TreinamentosController();
    const treinamentos = await treinamentosController.store({
      id_func,
      id_curso,
      data_treino,
    });

    return response.json(treinamentos);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

treinamentosRouter.get('/', async (request, response) => {
  const treinamentosRepositorio = getRepository(Treinamentos);
  const treinamentos = await treinamentosRepositorio.find();
  return response.json(treinamentos);
});

treinamentosRouter.get('/:id', async (request, response) => {
  const treinamentosRepositorio = getRepository(Treinamentos);
  const { id } = request.params;
  const treinamentos = await treinamentosRepositorio.findOne(id);
  return response.json(treinamentos);
});

treinamentosRouter.delete('/:id', async (request, response) => {
  const treinamentosRepositorio = getRepository(Treinamentos);
  const { id } = request.params;
  await treinamentosRepositorio.delete(id);
  return response.send();
});

treinamentosRouter.put('/:id', async (request, response) => {
  const { id_func, id_curso, data_treino } = request.body;

  const treinamentosRepositorio = getRepository(Treinamentos);
  const { id } = request.params;
  const treinamentos = await treinamentosRepositorio.findOne(id);
  if (!treinamentos) {
    return response.json({ message: 'Treinamentos não encontrado' });
  }
  treinamentos.id_func = id_func;
  treinamentos.id_curso = id_curso;
  treinamentos.data_treino = startOfHour(parseISO(data_treino));

  await treinamentosRepositorio.save(treinamentos);
  return response.json(treinamentos);
});

treinamentosRouter.get('/ListarTudo/:id', async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const funcionariosRepositorio = getRepository(Funcionarios);
  const treinamentosRepositorio = getRepository(Treinamentos);
  const { id } = request.params;
  const treinamentos = await treinamentosRepositorio.findOne(id);
  const curso = await cursosRepositorio.findOne(treinamentos?.id_curso);
  const funcionario = await funcionariosRepositorio.findOne(
    treinamentos?.id_func,
  );
  delete curso?.cargaHoraria_curso;
  delete curso?.created_at;
  delete curso?.updated_at;
  delete curso?.id_curso;
  delete funcionario?.email_func;
  delete funcionario?.foto_func;
  delete funcionario?.id_func;
  delete funcionario?.updated_at;
  delete funcionario?.created_at;
  delete treinamentos?.id_treino;
  delete treinamentos?.updated_at;
  delete treinamentos?.created_at;

  return response.json({ treinamentos, curso, funcionario });
});

export default treinamentosRouter;

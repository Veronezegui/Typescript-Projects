import { EntityRepository, getRepository } from 'typeorm';
import { Router } from 'express';
import Cursos from '../app/models/Cursos';
import CursosController from '../app/controllers/CursosController';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';

const cursosRouter = Router();
cursosRouter.use(ensureAuthenticated);

cursosRouter.post('/', async (request, response) => {
  try {
    const { name_curso, cargaHoraria_curso } = request.body;

    const cursosController = new CursosController();
    const curso = await cursosController.store({
      name_curso,
      cargaHoraria_curso,
    });

    return response.json(curso);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

cursosRouter.get('/', async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const curso = await cursosRepositorio.find();
  return response.json(curso);
});

cursosRouter.get('/:id', async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  const curso = await cursosRepositorio.findOne(id);
  return response.json(curso);
});

cursosRouter.delete('/:id', async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  await cursosRepositorio.delete(id);
  return response.send();
});

cursosRouter.put('/:id', async (request, response) => {
  const { name, cargaHoraria } = request.body;

  const cursosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  const cursos = await cursosRepositorio.findOne(id);
  if (!cursos) {
    return response.json({ message: 'Funcionário não encontrado' });
  }
  cursos.name_curso = name;
  cursos.cargaHoraria_curso = cargaHoraria;

  await cursosRepositorio.save(cursos);
  return response.json(cursos);
});

export default cursosRouter;

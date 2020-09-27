import { Router } from 'express';
import { getRepository } from 'typeorm';
import UsuariosController from '../app/controllers/UsuariosController';
import Usuarios from '../app/models/Usuarios';

const usuariosRouter = Router();

usuariosRouter.post('/', async (request, response) => {
  try {
    const { matricula, password } = request.body;

    const usuariosController = new UsuariosController();
    const user = await usuariosController.store({
      matricula,
      password,
    });

    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

usuariosRouter.get('/', async (request, response) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const user = await usuariosRepositorio.find();
  delete user[0].password;
  return response.json(user);
});

usuariosRouter.get('/:id', async (request, response) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const { id } = request.params;
  const user = await usuariosRepositorio.findOne(id);
  delete user.password;
  return response.json(user);
});

usuariosRouter.delete('/:id', async (request, response) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const { id } = request.params;
  await usuariosRepositorio.delete(id);
  return response.send();
});

export default usuariosRouter;

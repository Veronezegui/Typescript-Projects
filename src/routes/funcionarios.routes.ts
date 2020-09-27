import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import FuncionariosController from '../app/controllers/FuncionariosController';
import Funcionarios from '../app/models/Funcionarios';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import FotoFuncController from '../app/controllers/FotoFuncController';

const funcionariosRouter = Router();
const upload = multer(uploadConfig);

funcionariosRouter.use(ensureAuthenticated);

funcionariosRouter.post('/', async (request, response) => {
  try {
    const { name_func, email_func, foto_func } = request.body;

    const funcionariosController = new FuncionariosController();
    const funcionario = await funcionariosController.store({
      name_func,
      email_func,
      foto_func,
    });

    return response.json(funcionario);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

funcionariosRouter.get('/', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const funcionario = await funcionariosRepositorio.find();
  return response.json(funcionario);
});

funcionariosRouter.get('/:id', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  const funcionario = await funcionariosRepositorio.findOne(id);
  return response.json(funcionario);
});

funcionariosRouter.delete('/:id', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  await funcionariosRepositorio.delete(id);
  return response.send();
});

funcionariosRouter.patch(
  '/foto/:id',
  upload.single('foto_func'),
  async (request, response) => {
    try {
      const fotoFuncController = new FotoFuncController();
      const funcionario = await fotoFuncController.update({
        id_func: request.params.id,
        foto_funcFileName: request.file.filename,
      });
      console.log(request.file);
      return response.json(funcionario);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

funcionariosRouter.put('/:id', async (request, response) => {
  const { email, name } = request.body;

  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  const funcionario = await funcionariosRepositorio.findOne(id);
  if (!funcionario) {
    return response.json({ message: 'Funcionário não encontrado' });
  }
  funcionario.email_func = email;
  funcionario.name_func = name;
  await funcionariosRepositorio.save(funcionario);
  return response.json(funcionario);
});

export default funcionariosRouter;

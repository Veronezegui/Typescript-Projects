import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import FuncionariosController from '../app/controllers/FuncionariosController';
import Funcionarios from '../app/models/Funcionarios';

const funcionariosRouter = Router();
const upload = multer(uploadConfig);


funcionariosRouter.post('/', upload.single('foto'), async (request, response) => {
  try {
    const { name, funcao, departamento, email, telefone} = request.body;
    const funcionariosController = new FuncionariosController();
    const funcionario = await funcionariosController.store({
      name,
      funcao,
      departamento,
      email,
      telefone,
      foto: request.file.filename
    });

    return response.json(funcionario);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

funcionariosRouter.get('/', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const funcionario = await funcionariosRepositorio.find({select: ['name','funcao' ,'departamento', 'email', 'telefone', 'foto']});
  return response.json(funcionario);
});

funcionariosRouter.get('/:id', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  const funcionario = await funcionariosRepositorio.findOne(id, {select: ['name', 'departamento', 'email', 'telefone', 'foto']});
  return response.json(funcionario);
});

funcionariosRouter.delete('/:id', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  await funcionariosRepositorio.delete(id);
  return response.send();
});

funcionariosRouter.put('/:id', async (request, response) => {
  const {name, funcao, departamento, email, telefone, foto } = request.body;

  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  const funcionario = await funcionariosRepositorio.findOne(id);
  if (!funcionario) {
    return response.json({ message: 'Funcionário não encontrado' });
  }
  funcionario.name = name;
  funcionario.funcao = funcao;
  funcionario.departamento = departamento;
  funcionario.email = email;
  funcionario.telefone = telefone;
  funcionario.foto = foto;
  
  await funcionariosRepositorio.save(funcionario);
  return response.json(funcionario);
});

funcionariosRouter.put('/like/:id', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  const funcionario = await funcionariosRepositorio.findOne(id);
  if (!funcionario) {
    return response.json({ message: 'Funcionário não encontrado' });
  }
  funcionario.like = funcionario.like + 1
  
  await funcionariosRepositorio.save(funcionario);
  return response.json(funcionario);
});

funcionariosRouter.put('/deslike/:id', async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  const funcionario = await funcionariosRepositorio.findOne(id);
  if (!funcionario) {
    return response.json({ message: 'Funcionário não encontrado' });
  }
  funcionario.deslike = funcionario.deslike + 1
  
  await funcionariosRepositorio.save(funcionario);
  return response.json(funcionario);
});


export default funcionariosRouter;

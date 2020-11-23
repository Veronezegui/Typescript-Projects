import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import DependentesController from '../app/controllers/DependentesController';
import Dependentes from '../app/models/Dependentes';

const dependentesRouter = Router();
const upload = multer(uploadConfig);

dependentesRouter.post('/',  upload.single('foto'), async (request, response) => {
    try {
      const { name, data_nasc, grau_parentesco, id_func} = request.body;
      const dependentesController = new DependentesController();
      const dependente = await dependentesController.store({
        name,
        data_nasc,
        grau_parentesco,
        id_func,
        foto: request.file.filename,
      });
      return response.json(dependente);
    } catch (erro) {
      return response.status(400).json({ error: erro.message });
    }
});

dependentesRouter.get('/', async (request, response) => {
    const dependentesRepositorio = getRepository(Dependentes);
    const dependente = await dependentesRepositorio.find({select: ['name', 'data_nasc', 'grau_parentesco', 'foto']});
    return response.json(dependente);
});  

dependentesRouter.get('/:id', async (request, response) => {
    const {id} = request.params
    const dependentesRepositorio = getRepository(Dependentes);
    const dependente = await dependentesRepositorio.findOne(id, {select: ['name', 'data_nasc', 'grau_parentesco', 'foto']});
    return response.json(dependente);
});  

dependentesRouter.delete('/:id', async (request, response) => {
  const dependentesRepositorio = getRepository(Dependentes);
  const { id } = request.params;
  await dependentesRepositorio.delete(id);
  return response.send();
});

dependentesRouter.put('/:id', upload.single('foto'), async (request, response) => {
  const {name, data_nasc, grau_parentesco} = request.body;

  const dependentesRepositorio = getRepository(Dependentes);
  const { id } = request.params;
  const dependente = await dependentesRepositorio.findOne(id);
  if (!dependente) {
    return response.json({ message: 'Dependente não encontrado' });
  }
});

dependentesRouter.get('/deFuncionario/:id', async (request, response) => {
  const {id} = request.params;
  const dependentesRepositorio = getRepository(Dependentes);
  const dependente = await dependentesRepositorio.findOne(id, {relations: ['func']})
  if (!dependente) {
    return response.json({ message: 'Funcionario não encontrado' });
  }
  console.log(dependente)
  return response.json(dependente);
})

export default dependentesRouter;
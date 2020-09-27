import { getRepository } from 'typeorm';
import { startOfHour, parseISO, addHours } from 'date-fns';
import Treinamentos from '../models/Treinamentos';
import Cursos from '../models/Cursos';
import Funcionarios from '../models/Funcionarios';

interface Request {
  id_func: string;
  id_curso: string;
  data_treino: string;
}

class TreinamentosController {
  public async store({
    id_func,
    id_curso,
    data_treino,
  }: Request): Promise<Treinamentos> {
    const funcionariosRepository = getRepository(Funcionarios);
    const cursosRepository = getRepository(Cursos);
    const treinamentosRepository = getRepository(Treinamentos);
    const DataInput = startOfHour(parseISO(data_treino));
    const funcionario = await funcionariosRepository.findOne(id_func);
    if (!funcionario) {
      throw new Error('Erro ao encontrar o respectivo funcionário');
    }
    const curso = await cursosRepository.findOne(id_curso);
    if (!curso) {
      throw new Error('Erro ao encontrar o respectivo curso!');
    }
    const somaData = addHours(DataInput, curso.cargaHoraria_curso);
    const treinamentos = treinamentosRepository.create({
      id_func,
      id_curso,
      data_treino: DataInput,
      vencimento_treino: somaData,
    });
    await treinamentosRepository.save(treinamentos);
    return treinamentos;
  }
}

export default TreinamentosController;

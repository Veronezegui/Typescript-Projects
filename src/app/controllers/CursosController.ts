import { getRepository } from 'typeorm';

import Cursos from '../models/Cursos';

interface Request {
  name_curso: string;
  cargaHoraria_curso: string;
}
class CursosController {
  public async store({
    name_curso,
    cargaHoraria_curso,
  }: Request): Promise<Cursos> {
    const cursosRepository = getRepository(Cursos);
    const verificaCursoExiste = await cursosRepository.findOne({
      where: { name_curso },
    });

    if (verificaCursoExiste) {
      throw new Error('Nome do curso já cadastrado');
    }

    const curso = cursosRepository.create({
      name_curso,
      cargaHoraria_curso,
    });

    await cursosRepository.save(curso);

    return curso;
  }
}

export default CursosController;

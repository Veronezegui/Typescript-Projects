import { getRepository } from 'typeorm';

import Funcionarios from '../models/Funcionarios';

interface Request {
  name_func: string;
  email_func: string;
  foto_func: string;
}
class FuncionariosController {
  public async store({
    name_func,
    email_func,
    foto_func,
  }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);
    const verificaFuncionarioExiste = await funcionariosRepository.findOne({
      where: { email_func },
    });

    if (verificaFuncionarioExiste) {
      throw new Error('Email do funcionário já cadastrado');
    }

    const funcionario = funcionariosRepository.create({
      name_func,
      email_func,
      foto_func,
    });

    await funcionariosRepository.save(funcionario);

    return funcionario;
  }
}

export default FuncionariosController;

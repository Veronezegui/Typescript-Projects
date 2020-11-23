import { getRepository } from 'typeorm';

import Funcionarios from '../models/Funcionarios';

interface Request {
  name: string;
  funcao: string;
  departamento: string;
  email: string;
  telefone: string;
  foto: string;
}
class FuncionariosController {
  public async store({
    name,
    funcao,
    departamento,
    email,
    telefone,
    foto
  }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);
    const verificaFuncionarioExiste = await funcionariosRepository.findOne({
      where: { email },
    });

    if (verificaFuncionarioExiste) {
      throw new Error('Email do funcionário já cadastrado');
    }

    const funcionario = funcionariosRepository.create({
      name,
      funcao,
      departamento,
      email,
      telefone,
      foto
    });

    await funcionariosRepository.save(funcionario);

    return funcionario;
  }
}

export default FuncionariosController;

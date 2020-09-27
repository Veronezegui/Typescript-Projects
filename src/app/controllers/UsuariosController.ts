import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Usuarios from '../models/Usuarios';

interface Request {
  matricula: string;
  password: string;
}

class UsuariosController {
  public async store({ matricula, password }: Request): Promise<Usuarios> {
    const usuariosRepository = getRepository(Usuarios);
    const verificaUsuarioExiste = await usuariosRepository.findOne({
      where: { matricula },
    });

    if (verificaUsuarioExiste) {
      throw new Error('Matrícula já cadastrada');
    }
    const hashedPassword = await hash(password, 8);

    const user = usuariosRepository.create({
      matricula,
      password: hashedPassword,
    });

    await usuariosRepository.save(user);

    return user;
  }
}

export default UsuariosController;

import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Usuarios from '../models/Usuarios';
import authConfig from '../../config/auth';

interface Request {
  matricula: string;
  password: string;
}
interface Response {
  user: Usuarios;
  token: string;
}

class SessionController {
  public async store({ matricula, password }: Request): Promise<Response> {
    const usuariosRepository = getRepository(Usuarios);
    const user = await usuariosRepository.findOne({ where: { matricula } });
    if (!user) {
      throw new Error('Matricula ou senha incorretos');
    }

    const verificaSenha = await compare(password, user.password);

    if (!verificaSenha) {
      throw new Error('Matricula ou senha incorretos');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default SessionController;

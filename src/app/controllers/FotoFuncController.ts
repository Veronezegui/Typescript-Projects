import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Funcionarios from '../models/Funcionarios';
import uploadConfig from '../../config/upload';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

interface Request {
  id_func: string;
  foto_funcFileName: string;
}
class FotoFuncController {
  public async update({
    id_func,
    foto_funcFileName,
  }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);
    const funcionario = await funcionariosRepository.findOne(id_func);
    console.log(funcionario);
    if (!funcionario) {
      throw new Error('Esse funcionário não está cadastrado');
    }
    if (funcionario.foto_func.trim()) {
      const funcionarioFotoFilePath = path.join(
        tmpFolder,
        funcionario.foto_func,
      );
      const funcionarioFotoFileExist = await fs.promises.stat(
        funcionarioFotoFilePath,
      );
      console.log(funcionarioFotoFileExist);
      if (funcionarioFotoFileExist) {
        await fs.promises.unlink(funcionarioFotoFilePath);
      }
    }
    funcionario.foto_func = foto_funcFileName;
    await funcionariosRepository.save(funcionario);
    return funcionario;
  }
}

export default FotoFuncController;

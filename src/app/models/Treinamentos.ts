import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Funcionarios from './Funcionarios';
import Cursos from './Cursos';

@Entity('treinamentos')
class Treinamentos {
  @PrimaryGeneratedColumn('uuid')
  id_treino: string;

  @Column()
  id_func: string;

  @ManyToOne(() => Funcionarios)
  @JoinColumn({ name: 'id_func' })
  func: Funcionarios;

  @Column()
  id_curso: string;

  @ManyToOne(() => Cursos)
  @JoinColumn({ name: 'id_curso' })
  curso: Cursos;

  @Column('timestamp with time zone')
  data_treino: Date;

  @Column('timestamp with time zone')
  vencimento_treino: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Treinamentos;

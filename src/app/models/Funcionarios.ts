import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


import Dependentes from './Dependentes'

@Entity('funcionarios')
class Funcionarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  funcao: string;

  @Column()
  departamento: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  foto: string;

  @Column()
  like: number;

  @Column()
  deslike: number;

  @OneToMany(() => Dependentes, dep => dep.id_func)
  dep: Dependentes

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Funcionarios;

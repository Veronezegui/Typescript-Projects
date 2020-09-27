import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('funcionarios')
class Funcionarios {
  @PrimaryGeneratedColumn('uuid')
  id_func: string;

  @Column()
  name_func: string;

  @Column()
  email_func: string;

  @Column()
  foto_func: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Funcionarios;

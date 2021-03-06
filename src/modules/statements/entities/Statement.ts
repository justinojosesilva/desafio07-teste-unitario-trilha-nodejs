import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../users/entities/User';
import { OperationType } from '../useCases/createStatement/ICreateStatementDTO';
@Entity('statements')
export class Statement {
  @PrimaryColumn()
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.statement)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  send_id: string;

  @ManyToOne(() => User, user => user.statement)
  @JoinColumn({ name: 'send_id' })
  send_user: User;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

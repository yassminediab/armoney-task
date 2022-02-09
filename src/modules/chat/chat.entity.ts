import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from '../user/user.entity';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  name: string;

  @OneToMany(() => Message, (message) => message.chat, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats, { eager: true })
  @JoinTable({ name: 'chats_users' })
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

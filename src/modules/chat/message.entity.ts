import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../user/user.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  text: string;

  @Column('text', { nullable: true })
  file: string;

  @JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
  @ManyToOne(() => Chat, (chat) => chat.messages, {
    createForeignKeyConstraints: false,
  })
  chat: Chat;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.messages, {
    createForeignKeyConstraints: false,
  })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

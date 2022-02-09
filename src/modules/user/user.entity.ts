import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Message } from '../chat/message.entity';
import { Chat } from '../chat/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  phone: string;

  @Column({ length: 500, nullable: true })
  avatar: string;

  @OneToMany(() => Message, (message) => message.chat, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  messages?: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users, { eager: false })
  chats?: Chat[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}

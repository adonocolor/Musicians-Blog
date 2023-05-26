import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn, AutoEncryptionLoggerLevel
} from "typeorm";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class User {

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  @PrimaryGeneratedColumn()
  id!: string;

  @Column({type:'varchar', nullable: false, unique: true})
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn, AutoEncryptionLoggerLevel
} from "typeorm";
import { Role } from "./role.enum";
import { Post } from "../../post/entities/post.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

  constructor(username: string, firstName: string, lastName: string, password: string, description: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.description = description;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:'varchar', nullable: false, unique: true})
  username: string;

  @Column({type:'varchar', nullable: false})
  firstName: string;

  @Column({type:'varchar', nullable: false})
  lastName: string;

  @Column({default: 0})
  role: Role;

  @Column({type:'varchar'})
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @Column({type:'varchar', nullable: false})
  password: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}
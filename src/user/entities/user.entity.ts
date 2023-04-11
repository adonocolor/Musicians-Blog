import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Role } from "./role.enum";
import { Post } from "../../post/entities/post.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

  constructor(username: string, firstName: string, lastName: string, role: Role, password: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', nullable: false, unique: true})
  username: string;

  @Column({type:'varchar', nullable: false})
  firstName: string;

  @Column({type:'varchar', nullable: false})
  lastName: string;

  @Column({default: 0})
  role: Role;

  @Column({type:'varchar', nullable: false})
  password: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}
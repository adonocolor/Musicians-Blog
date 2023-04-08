import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Role } from "./role.enum";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', nullable: false})
  username: string;

  @Column({type:'varchar', nullable: false})
  firstName: string;

  @Column({type:'varchar', nullable: false})
  lastName: string;

  @Column()
  role: Role;

  @Column({type:'varchar', nullable: false})
  password: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}
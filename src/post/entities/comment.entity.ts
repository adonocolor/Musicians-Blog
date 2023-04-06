import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  text: string;


  @ManyToOne(() => User)
  user: User;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;
}

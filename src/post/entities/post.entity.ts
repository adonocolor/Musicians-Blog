import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', nullable: false})
  username: string;

  @Column({type:'varchar', nullable: false})
  info: string;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToOne(type => Comment, comment => comment.post)
  comments: Comment[];
}

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Comment } from './comment.entity';
import { Category } from "./category.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  postContent: string;

  @Column({type: 'varchar'})
  postUrl: string;

  @Column({type: 'varchar'})
  postTitle: string;

  @Column({type: 'timestamp'})
  postDate: Date;

  @Column({type: 'timestamp'})
  postModified: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToOne(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

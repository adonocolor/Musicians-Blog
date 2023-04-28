import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Comment } from './comment.entity';
import { Category } from "./category.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(postContent: string, postTitle: string, user: User, categories: Category[]) {
    this.postContent = postContent;
    this.postTitle = postTitle;
    this.user = user;
    this.categories = categories;
  }

  @Column({type: 'varchar'})
  postContent: string;

  @Column({type: 'varchar'})
  postTitle: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

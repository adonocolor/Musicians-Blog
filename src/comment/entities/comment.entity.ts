import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;
  constructor(commentText: string, user: User, post: Post) {
    this.commentText = commentText;
    this.user = user;
    this.post = post;
  }

  @Column({type: 'varchar'})
  commentText: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(type => Post, post => post.comments, { onDelete: 'CASCADE'})
  post: Post;
}

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";

@Entity()
export class Category {
  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true})
  categoryName: string;

  @ManyToMany(() => Post)
  posts: Post[];
}

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  categoryName: string;

  @Column({type: 'varchar'})
  categoryUrl: string;
}

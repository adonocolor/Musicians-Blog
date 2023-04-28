import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { CreateCategoryDto } from "../dto/category/create-category.dto";
import { UpdateCategoryDto } from "../dto/category/update-category.dto";
import { CreateCommentDto } from "../dto/comment/create-comment.dto";
import { UserService } from "../../user/services/user.service";
import { PostService } from "./post.service";
import { UpdateCommentDto } from "../dto/comment/update-comment.dto";
import { Comment } from "../entities/comment.entity"

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>;

  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;


  constructor(private readonly userService: UserService, private readonly postService: PostService) {
  }

  async create(userId: number, postId: number, dto: CreateCommentDto) {
    let user = await this.userService.getOne(userId);
    let post = await this.postService.getOne(postId);

    let c: Comment;
    c = new Comment(dto.commentText, user, post);
    return await this.commentRepository.save(c);
  }

  async getOne(id: number): Promise<Comment> {
    if (await this.commentRepository.findOneBy({ id }) === null)
      throw new NotFoundException()
    return await this.commentRepository.findOneBy({ id });
  }

  async getAllByPost(postId: number): Promise<Comment[]> {
    const found = await this.postRepository.findBy({id : postId})
    return await this.commentRepository.findBy({ post : found})
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async update(id: number, dto: UpdateCommentDto) {
    await this.commentRepository.update({ id : id }, { ...dto })
    return await this.getOne(id);
  }
}

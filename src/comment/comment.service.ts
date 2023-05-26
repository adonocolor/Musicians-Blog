import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../post/entities/post.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserService } from "../user/services/user.service";
import { PostService } from "../post/post.service";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity"
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { SessionContainer } from "supertokens-node/recipe/session";
import { User } from "../user/entities/user.entity";

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>;

  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;


  constructor(private readonly userService: UserService, private readonly postService: PostService) {
  }

  async create(session: SessionContainer, postId: number, dto: CreateCommentDto) {
    let userId = session.getUserId()
    let newUser = await EmailPassword.getUserById(userId)
    if (await this.userService.emailCheck(userId) === false) {
      await this.userService.create(newUser)
    }

    let user = await this.userRepository.findOneBy({id : userId})
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

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async update(id: number, dto: UpdateCommentDto) {

    const found = await this.commentRepository.findOne({
      where: { id: id }
    });

    if (!found) {
      throw new NotFoundException('Comment has not been found!');
    }

    return this.commentRepository.save({
      ...found,
      ...dto
    });
  }
}

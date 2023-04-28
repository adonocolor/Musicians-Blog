import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from '../dto/post/create-post.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { Category } from "../entities/category.entity";
import { CategoryService } from "./category.service";
import { UpdatePostDtoCategories } from "../dto/post/update-post-categories.dto";

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;


  constructor(private readonly categoryService: CategoryService) {
  }

  async create(userId: number, dto: CreatePostDto) {
    let user: User;
    user = await this.userRepository.findOneBy({ id: userId })

    let post: Post;
    post = new Post(dto.postContent, dto.postTitle, user, dto.categories)
    return await this.postRepository.save(post);
  }

  async getAll() {
    let posts = await this.postRepository.find({
      select: {
        id: true,
        postTitle: true,
        postContent: true,
        createdAt: true,
        comments: {
          id: true,
          commentText: true,
          user: {
            username: true,
          }
        }
      },
      relations: ['comments', 'comments.user', 'categories']
    });
    return posts.reverse()
  }

  async getOne(id: number) {
    if (await this.postRepository.findOneBy({ id }) === null)
      throw new NotFoundException()
    return await this.postRepository.findOneBy({ id });
  }
  async getAllByCategory(name: string) {
    let category: Category;
    category = await this.categoryRepository.findOneBy({ categoryName: name })
    if (await this.postRepository.findBy({ categories: category}) === null)
      throw new NotFoundException()
    return await this.postRepository.findBy({ categories: category });
  }
  async getOneByTitle(title: string) {
    if (await this.postRepository.findOneBy({ postTitle: title}) === null)
      throw new NotFoundException()
    return await this.postRepository.findOneBy({ postTitle: title });
  }

  async getAllByUser(username: string) {
    let user: User;
    user = await this.userRepository.findOneBy({ username: username })

    if (await this.postRepository.findBy({ user: user }) === null)
      throw new NotFoundException()
    return await this.postRepository.findBy({ user: user });
  }

  async update(updatePostDto: UpdatePostDto) {
    await this.postRepository.update({ id: updatePostDto.id }, { ...updatePostDto });
    return await this.getOne(updatePostDto.id);
  }
  async remove(id: number) {
    await this.postRepository.delete(id);
  }
}

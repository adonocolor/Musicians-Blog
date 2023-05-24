import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { Category } from "../category/entities/category.entity";
import { CreateCategoryDto } from "../category/dto/create-category.dto";

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(dto: CreatePostDto) {
    let user = null
    let post: Post
    let categories = await this.categoryCheck(dto.categories)
    post = new Post(dto.postContent, dto.postTitle, user, categories)
    return await this.postRepository.save(post)
  }

  async getAll() {
    return await this.postRepository.find({
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
  }

  async getOne(id: number) {
    if (await this.postRepository.findOneBy({ id }) === null)
      throw new NotFoundException()
    return await this.postRepository.findOneBy({ id })
  }

  async getOneByTitle(title: string) {
    if (await this.postRepository.findOneBy({ postTitle: title}) === null)
      throw new NotFoundException()
    return await this.postRepository.findOneBy({ postTitle: title });
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    const foundPost = await this.postRepository.findOne({
      where: { id: postId }
    });

    if (!foundPost) {
      throw new NotFoundException()
    }

    let categories = await this.categoryCheck(updatePostDto.categories)

    foundPost.categories = categories
    foundPost.postContent = updatePostDto.postContent
    foundPost.postTitle = updatePostDto.postTitle

    return this.postRepository.save({ ...foundPost });
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }

  private async categoryCheck(categories: CreateCategoryDto[]): Promise<null | Category[]> {
    if (categories.length === 0) {
      return null
    }

    let postCat = new Array<Category>

    for (let i = 0; i < categories.length; i++) {
      let found = await this.categoryRepository.findOneBy({ categoryName: categories[i].categoryName })
      if (!found) {
        throw new NotFoundException(`There is no category with the name ${categories[i].categoryName}!`)
      }

      postCat.push(found)
      return postCat
    }
  }
}
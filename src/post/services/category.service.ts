import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../entities/post.entity";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UpdateUserDto } from "../../user/dto/update-user.dto";
import { CreateCategoryDto } from "../dto/category/create-category.dto";
import { UpdateCategoryDto } from "../dto/category/update-category.dto";
import { CreateCommentDto } from "../dto/comment/create-comment.dto";

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly repository: Repository<Category>;

  async create(dto: CreateCategoryDto) {
    await this.categoryCheck(dto.categoryName)
    let c: Category;
    c = new Category(dto.categoryName);
    return await this.repository.save(c);
  }

  async getOne(id: number): Promise<Category | null> {
    if (await this.repository.findOneBy({ id }) === null)
      throw new NotFoundException()
    return await this.repository.findOneBy({ id });
  }

  async getOneByName(categoryName: string): Promise<Category | null> {
    return await this.repository.findOneBy({ categoryName });
  }

  async getAll(): Promise<Category[]> {
    return await this.repository.find()
  }

  async remove(name: string): Promise<void> {
    await this.repository.delete({categoryName : name });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.categoryCheck(dto.categoryName)
    await this.repository.update({ id: id }, { ...dto })
    return await this.getOne(id)
  }

  private async categoryCheck(name: string){
    let cs = await this.repository.findBy({categoryName : name})
    if (cs.length === 1)
      throw new BadRequestException('There is a category like this!')
  }
}

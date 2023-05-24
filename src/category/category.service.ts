import { BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

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

  async getAll(): Promise<Category[]> {
    return await this.repository.find()
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({id : id });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.categoryCheck(dto.categoryName)

    const found = await this.repository.findOne({
      where: { id: id }
    });

    if (!found) {
      throw new NotFoundException('Category has not been found!');
    }

    return this.repository.save({
      ...found,
      ...dto
    });
  }

  private async categoryCheck(name: string){
    let cs = await this.repository.findBy({categoryName : name})
    if (cs.length === 1)
      throw new BadRequestException('There is a category like this!')
  }
}

import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(
  ) {}

  async create(dto: CreateUserDto) {
    await this.usernameCheck(dto.username)
    let user: User;
    user = new User(dto.username, dto.firstName, dto.lastName, dto.password, dto.description);
    return await this.repository.save(user);
  }

  async getOne(id: number): Promise<User | null> {
    if (await this.repository.findOneBy({ id }) === null)
      throw new NotFoundException()
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<User[]> {
    return await this.repository.find()
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.usernameCheck(dto.username)
    await this.repository.update({ id: id }, { ...dto })
    return await this.getOne(id)
  }

  private async usernameCheck(username: string) {
    let users = await this.repository.findBy({username : username})
    if (users.length === 1)
      throw new BadRequestException('There is a user with a username like this!')
  }
}

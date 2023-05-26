import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "../dto/update-user.dto";
import EmailPassword from "supertokens-node/recipe/emailpassword";

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(
  ) {}

  async create(user: EmailPassword.User) {
    let newUser = new User(user.id, user.email);
    return await this.repository.save(newUser);
  }

  async getOne(id: string): Promise<User | null> {
    if (await this.repository.findOneBy({ id }) === null)
      throw new NotFoundException()
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<User[]> {
    return await this.repository.find()
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }


  async emailCheck(email: string) {
    let users = await this.repository.findBy({email : email})
    if (users.length === 1)
      return true
    return false
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Put,
  Inject,
  ParseIntPipe
} from "@nestjs/common";
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { ApiImplicitParam } from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";

@ApiTags('Users')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  constructor() {}
  
  @ApiOperation({ summary: 'Create User'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created' })
  @ApiBody({type: CreateUserDto, description: 'User Data Transfer Object that is being created'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Find User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiParam({name: 'id', type: 'number', description: 'User Id to be found'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No content' })
  @ApiParam({name: 'id', type: 'number', description: 'User Id to be updated'})
  @ApiBody({type: UpdateUserDto, description: 'User Data Transfer Object that is being updated'})
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiParam({name: 'id', type: 'number', description: 'User Id to be deleted'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  getAll() {
    return this.userService.getAll();
  }
}

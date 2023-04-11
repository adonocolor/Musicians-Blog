import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { ApiImplicitParam } from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({type: CreateUserDto, description: 'User Data Transfer Object that is being created'})
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return 'this action create a new user'
  }


  @ApiOperation({ summary: 'Find User' })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The user has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'User Id to be found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The user has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The user hasn\'t been found' })
  @ApiResponse({ status: HttpStatus.NOT_MODIFIED, description: 'The user hasn\'t been modified' })
  @ApiParam({name: 'id', type: 'number', description: 'User Id to be updated'})
  @ApiBody({type: UpdateUserDto, description: 'User Data Transfer Object that is being updated'})
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 302, description: 'The user has been successfully found' })
  @ApiResponse({
    status: 400,
    description: 'Bad request'
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been deleted'
  })
  @ApiResponse({
    status: 404,
    description: 'The user hasn\'t been found'
  })
  @ApiResponse({
    status: 304,
    description: 'The user hasn\'t been modified'
  })
  @ApiParam({name: 'id', type: 'number', description: 'User Id to be deleted'})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a #${id} user`;
  }
}

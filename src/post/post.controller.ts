import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpStatus } from "@nestjs/common";
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { UpdatePostDto } from "./dto/update-post.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: 'Create Post'
  })
  @ApiParam({name: 'user', type: 'User'})
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request'
  })
  @ApiBody({type: CreatePostDto, description: 'Post Data Transfer Object that is being created'})
  @Post('/create')
  create(@Body() createPostDto: CreatePostDto, @Param() id: number) {
    return 'This action creates a new post by user with id: #${id}'
  }

  @ApiOperation({summary: 'Find Post'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The post has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Post Id to be found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({summary: 'Update Post'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The post has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The post hasn\'t been found' })
  @ApiResponse({ status: HttpStatus.NOT_MODIFIED, description: 'The post hasn\'t been modified' })
  @ApiParam({name: 'id', type: 'number', description: 'Post Id to be updated'})
  @ApiBody({type: CreatePostDto, description: 'Post Data Transfer Object that is being updated'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({summary: 'Delete Post'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The post has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The post has been deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The post hasn\'t been found' })
  @ApiResponse({status: HttpStatus.NOT_MODIFIED, description: 'The post hasn\'t been deleted' })
  @ApiParam({name: 'id', type: 'number', description: 'Post Id to be deleted'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @ApiOperation({summary: 'Find all Posts of one particular User'})
  @ApiParam({name: 'userId', type: 'number', description: 'User Id that helps us to find all posts related to him'})
  @Get('/all/:userId')
  findAllByUser(@Query('userId') userId: number) {
    return this.postService.findAll();
  }

  @ApiOperation({summary: 'Find all Posts by Category'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The posts has been successfully found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The category hasn\'t been found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'categoryId', type: 'number', description: 'Category Id that helps us to find all posts related to it'})
  @Get('/all/:categoryId')
  findAllByCategory(@Query('categoryId') categoryId: number) {
    return `This actions finds all posts by a #${categoryId} category`;
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpStatus, UseGuards } from "@nestjs/common";
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { UpdatePostDto } from "../dto/post/update-post.dto";
import { UpdateUserDto } from "../../user/dto/update-user.dto";
import { AuthGuard } from "../../auth/auth.guard";

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create Post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({type: CreatePostDto, description: 'Post Data Transfer Object that is being created'})
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Post(':userId')
  create(@Param('userId') userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(userId, createPostDto);
  }

  @ApiOperation({summary: 'Find all Posts'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get('all')
  findAll(){
    return this.postService.getAll();
  }

  @ApiOperation({summary: 'Update Post'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Post Id to be updated'})
  @ApiBody({type: CreatePostDto, description: 'Post Data Transfer Object that is being updated'})
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Put('id/:id')
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto);
  }

  @ApiOperation({summary: 'Delete Post'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Post Id to be deleted'})
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @ApiOperation({summary: 'Find all Posts of One User'})
  @ApiParam({name: 'userId', type: 'number', description: 'User Id that helps us to find all posts related to him'})
  @Get('username/:username/all')
  findAllByUser(username: string) {
    return this.postService.getAllByUser(username);
  }

  @ApiOperation({summary: 'Find all Posts by Specific Category'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'categoryId', type: 'number', description: 'Category Id that helps us to find all posts related to it'})
  @Get('category/:category/all')
  findAllByCategory(categoryName: string) {
    return this.postService.getAllByCategory(categoryName);
  }


  @ApiOperation({summary: 'Find Post by Title'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get(':title')
  findOneByTitle(@Query('title') title: string) {
    return this.postService.getOneByTitle(title)
  }
}

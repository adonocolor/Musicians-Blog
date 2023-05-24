import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpStatus,
  UseGuards,
  Patch,
  NotFoundException, ValidationPipe, ParseIntPipe
} from "@nestjs/common";
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { UpdatePostDto } from "./dto/update-post.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create Post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({type: CreatePostDto, description: 'Post Data Transfer Object that is being created'})
  @ApiSecurity('basic')
  @Post('')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({summary: 'Find all Posts'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The posts are shown' })
  @Get('all')
  findAll(){
    return this.postService.getAll();
  }

  @ApiOperation({summary: 'Update Post'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The post has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The post has not been found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The parameters has not been validated correctly' })
  @ApiSecurity('basic')
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) postId: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(postId, updatePostDto);
  }

  @ApiOperation({summary: 'Delete Post'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The post has not been found' })
  @ApiParam({name: 'id', type: 'number', description: 'Post Id to be deleted'})
  @ApiSecurity('basic')
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.postService.remove(+id);
  }


  @ApiOperation({summary: 'Find Post by Title'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get(':title')
  findOneByTitle(@Query('title') title: string) {
    return this.postService.getOneByTitle(title)
  }
}

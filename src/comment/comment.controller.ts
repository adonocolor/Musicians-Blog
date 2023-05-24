import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, Query, UseGuards, Patch } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PostService } from "../post/post.service";
import { CommentService } from "./comment.service";

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({ summary: 'Create Comment'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Either user or post wasn\'t found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'userId', type: 'number', description: 'User Id related to the created comment'})
  @ApiParam({name: 'postId', type: 'number', description: 'Post Id related to the created comment'})
  @ApiBody({type: CreateCommentDto, description: 'Comment Data Transfer Object'})
  @ApiSecurity('basic')
  @Post(':postId/:userId')
  create(@Param('userId') userId: number, @Param('postId') postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(userId, postId,  createCommentDto)
  }


  @ApiOperation({ summary: 'Find Comment'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be found'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.getOne(id)
  }

  @ApiOperation({ summary: 'Update Comment'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiSecurity('basic')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto)
  }

  @ApiOperation({ summary: 'Delete Comment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be removed'})
  @ApiSecurity('basic')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id)
  }
}

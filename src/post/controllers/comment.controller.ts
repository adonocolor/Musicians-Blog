import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCommentDto } from "../dto/comment/create-comment.dto";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UpdateUserDto } from "../../user/dto/update-user.dto";
import { UpdateCommentDto } from "../dto/comment/update-comment.dto";
import { PostService } from "../services/post.service";
import { CommentService } from "../services/comment.service";
import { AuthGuard } from "../../auth/auth.guard";

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
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Post(':postId/:userId')
  create(@Query('userId') userId: number, @Query('postId') postId: number, @Body() createCommentDto: CreateCommentDto) {
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
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be updated'})
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto)
  }

  @ApiOperation({ summary: 'Delete Comment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be removed'})
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id)
  }

  @ApiOperation({summary: 'Get all comments from particular post'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'postId', type: 'number', description: 'Post Id related to the comments'})
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Get('/:postId/all')
  getAllByPost(@Query('postId') postId: number) {
    return this.commentService.getAllByPost(postId)
  }
}

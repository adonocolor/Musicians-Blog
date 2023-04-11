import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  @ApiOperation({ summary: 'Create Comment'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The comment has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'postId', type: 'number', description: 'Post Id related to the created comment'})
  @ApiBody({type: CreateCommentDto, description: 'Comment Data Transfer Object'})
  @Post('/:postId/create')
  create(@Param('postId') postId: number, @Body() createCommentDto: CreateCommentDto) {
    return 'this action creates a new comment'
  }


  @ApiOperation({ summary: 'Find Comment'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The comment has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} comment`;
  }

  @ApiOperation({ summary: 'Update Comment'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The comment hasn\'t been found' })
  @ApiResponse({ status: HttpStatus.NOT_MODIFIED, description: 'The comment hasn\'t been modified' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be updated'})
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  @ApiOperation({ summary: 'Delete Comment' })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The comment has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The comment hasn\'t been found' })
  @ApiResponse({status: HttpStatus.NOT_MODIFIED, description: 'The comment hasn\'t been deleted' })
  @ApiParam({name: 'id', type: 'number', description: 'Comment Id to be removed'})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a #${id} comment`;
  }

  @ApiOperation({summary: 'Find all comments of one particular User'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The comments has been successfully found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The user hasn\'t been found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'userId', type: 'number', description: 'User Id related to the comments'})
  @Get('/all/:userId')
  findAllByUser(@Query('userId') userId: number) {
    return `This actions finds all comments by a #${userId}  user`;
  }
}

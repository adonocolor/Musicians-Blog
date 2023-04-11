import { Controller, Post, Body, HttpStatus, Get, Param, Put, Delete, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags('Categories')
@Controller('category')
export class CategoryController {

  @ApiOperation({ summary: 'Create Category'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The categorye has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({type: CreateCategoryDto, description: 'Category Data Transfer Object'})
  @Post('/create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return 'this action creates a new category'
  }


  @ApiOperation({ summary: 'Find Category' })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The category has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} category`;
  }

  @ApiOperation({ summary: 'Update Category'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The category has been updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The category hasn\'t been found' })
  @ApiResponse({ status: HttpStatus.NOT_MODIFIED, description: 'The category hasn\'t been modified' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be updated'})
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'The category has been successfully found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The category has been deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The category hasn\'t been found' })
  @ApiResponse({status: HttpStatus.NOT_MODIFIED, description: 'The category hasn\'t been deleted' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be deleted'})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a #${id} category`;
  }
}

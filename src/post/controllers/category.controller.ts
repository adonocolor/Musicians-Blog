import { Controller, Post, Body, HttpStatus, Get, Param, Put, Delete, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "../dto/category/create-category.dto";
import { CreateCommentDto } from "../dto/comment/create-comment.dto";
import { UpdateCommentDto } from "../dto/comment/update-comment.dto";
import { UpdateCategoryDto } from "../dto/category/update-category.dto";
import { PostService } from "../services/post.service";
import { CategoryService } from "../services/category.service";
import { AuthGuard } from "../../auth/auth.guard";

@ApiTags('Categories')
@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create Category'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The category has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({type: CreateCategoryDto, description: 'Category Data Transfer Object'})
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }


  @ApiOperation({ summary: 'Find Category' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be found'})
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.getOne(id)
  }

  @ApiOperation({ summary: 'Update Category'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The category has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be updated'})
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be deleted'})
  @ApiSecurity('basic')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.categoryService.remove(name)
  }

  @ApiOperation({ summary: 'Get All Categories' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Get Category by name' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get(':name')
  getOneByName(@Param('name') name: string) {
    return this.categoryService.getOneByName(name)
  }
}

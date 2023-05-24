import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Patch,
  ParseIntPipe
} from "@nestjs/common";
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CreateCommentDto } from "../comment/dto/create-comment.dto";
import { UpdateCommentDto } from "../comment/dto/update-comment.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PostService } from "../post/post.service";
import { CategoryService } from "./category.service";

@ApiTags('Categories')
@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get All Categories' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Get Category By Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be found'})
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.getOne(id)
  }

  @ApiOperation({ summary: 'Create Category'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The category has been successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBody({type: CreateCategoryDto, description: 'Category Data Transfer Object'})
  @ApiSecurity('basic')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @ApiOperation({ summary: 'Update Category'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The category has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be updated'})
  @ApiSecurity('basic')
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto)
  }

  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The comment has been updated' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({name: 'id', type: 'number', description: 'Category Id to be deleted'})
  @ApiSecurity('basic')
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.remove(id)
  }
}

import { Controller, Get, HttpCode, HttpStatus, Render, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";


@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Index page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Render('index')
  getDefault(@Res() res: Response) {
    return { layout: 'main', message: 'index', footer: true };
  }

  @ApiOperation({
    summary: 'Index page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/index')
  @HttpCode(HttpStatus.OK)
  @Render('index')
  getIndex(@Res() res: Response) {
    return { layout: 'main', message: 'index', footer: true};
  }

  @ApiOperation({
    summary: 'Blog page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/blog')
  @HttpCode(HttpStatus.OK)
  @Render('blog')
  getBlog(@Res() res: Response) {
    return { layout: 'main', message: 'blog', footer: true};
  }

  @ApiOperation({
    summary: 'Contact page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/contact')
  @HttpCode(HttpStatus.OK)
  @Render('contact')
  getContact(@Res() res: Response) {
    return { layout: 'main', message: 'contact', footer: false};
  }

  @ApiOperation({
    summary: 'Music page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/music')
  @HttpCode(HttpStatus.OK)
  @Render('music')
  getMusic(@Res() res: Response) {
    return { layout: 'main', message: 'music', footer: true};
  }

  @ApiOperation({
    summary: 'Notes page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/notes')
  @HttpCode(HttpStatus.OK)
  @Render('notes')
  getNotes(@Res() res: Response) {
    return { layout: 'main', message: 'notes', footer: true};
  }

  @ApiOperation({
    summary: 'Photos page'
  })
  @ApiResponse({
    status: 200,
    description: 'OK'
  })
  @Get('/photos')
  @HttpCode(HttpStatus.OK)
  @Render('photos')
  getPhotos(@Res() res: Response) {
    return { layout: 'main', message: 'photos', footer: true};
  }
}

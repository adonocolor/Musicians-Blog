import { Controller, Get, HttpCode, HttpStatus, Render, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Render('index')
  getDefault(@Res() res: Response) {
    return { layout: 'main', message: 'index', footer: true };
  }

  @Get('/index')
  @HttpCode(HttpStatus.OK)
  @Render('index')
  getIndex(@Res() res: Response) {
    return { layout: 'main', message: 'index', footer: true};
  }

  @Get('/blog')
  @HttpCode(HttpStatus.OK)
  @Render('blog')
  getBlog(@Res() res: Response) {
    return { layout: 'main', message: 'blog', footer: true};
  }

  @Get('/contact')
  @HttpCode(HttpStatus.OK)
  @Render('contact')
  getContact(@Res() res: Response) {
    return { layout: 'main', message: 'contact', footer: false};
  }

  @Get('/music')
  @HttpCode(HttpStatus.OK)
  @Render('music')
  getMusic(@Res() res: Response) {
    return { layout: 'main', message: 'music', footer: true};
  }

  @Get('/notes')
  @HttpCode(HttpStatus.OK)
  @Render('notes')
  getNotes(@Res() res: Response) {
    return { layout: 'main', message: 'notes', footer: true};
  }

  @Get('/photos')
  @HttpCode(HttpStatus.OK)
  @Render('photos')
  getPhotos(@Res() res: Response) {
    return { layout: 'main', message: 'photos', footer: true};
  }
}

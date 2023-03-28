import { Controller, Get } from "@nestjs/common";
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getDefault(@Res() res: Response){
    return res.render('index', { layout: 'main', message: 'index', footer: true});
  }

  @Get('/index')
  getIndex(@Res() res: Response){
    return res.render('index', { layout: 'main', message: 'index', footer: true});
  }

  @Get('/blog')
  getBlog(@Res() res: Response){
    return res.render('blog', { layout: 'main', message: 'blog', footer: true});
  }

  @Get('/contact')
  getContact(@Res() res: Response){
    return res.render('contact', { layout: 'main', message: 'contact', footer: false});
  }

  @Get('/music')
  getMusic(@Res() res: Response){
    return res.render('music', { layout: 'main', message: 'music', footer: true});
  }

  @Get('/notes')
  getNotes(@Res() res: Response){
    return res.render('notes', { layout: 'main', message: 'notes', footer: true});
  }

  @Get('/photos')
  getPhotos(@Res() res: Response){
    return res.render('photos', { layout: 'main', message: 'photos', footer: true});
  }
}

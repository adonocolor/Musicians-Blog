import { Controller, Get, HttpCode, HttpStatus, Render, UseGuards, UseInterceptors } from "@nestjs/common";
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
import { AuthGuard } from "./auth/auth.guard";


@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/index')
  @Render('index')
  getDefault(@Res() res: Response) {
    return { layout: 'main', message: 'index', auth: true, footer: true };
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('')
  @Render('index')
  getIndex(@Res() res: Response) {
    return { layout: 'main', message: 'index', auth: true, footer: true};
  }


  @Get('/blog')
  @Render('blog')
  getBlog(@Res() res: Response) {
    return { layout: 'main', message: 'blog', footer: true};
  }


  @Get('/contact')
  @Render('contact')
  getContact(@Res() res: Response) {
    return { layout: 'main', message: 'contact', footer: false};
  }

  @Get('/profile')
  @Render('profile')
  getProfile(@Res() res: Response) {
    return { layout: 'main', message: 'profile', footer: true};
  }

  @Get('/posts')
  @Render('posts')
  getPosts(@Res() res: Response) {
    return { layout: 'main', message: 'profile', footer: true};
  }

  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Get('/create')
  @Render('create')
  create(@Res() res: Response) {
    return { layout: 'main', message: 'create', footer: true};
  }

  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Get('create-post')
  @Render('createPost')
  createPost(@Res() res: Response) {
    return { layout: 'main', message: 'create_post', footer: true};
  }

  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Get('create-category')
  @Render('createCategory')
  createCategory(@Res() res: Response) {
    return { layout: 'main', message: 'create_category', footer: true};
  }

  @Render('register')
  @Get('register')
  createUser(@Res() res: Response) {
    return { layout: 'main', message: 'register'  };
  }

  @Render('authForm')
  @Get('auth-form')
  authForm(@Res() res: Response) {
    return { layout: 'main', message: 'authForm', footer: true};
  }
}

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
import { SessionContainer } from 'supertokens-node/recipe/session';
import { getUserById } from 'supertokens-node/lib/build/recipe/thirdparty';


@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/index')
  @Render('index')
  async getInd(@Res() res: Response) {
    return { layout: 'main', message: 'index', footer: true};
  }

  @Get('')
  @Render('index')
  async getIndex(@Res() res: Response) {
    return { layout: 'main', message: 'index', footer: true};
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

  @Get('/create')
  @Render('create')
  create(@Res() res: Response) {
    return { layout: 'main', message: 'create', footer: true};
  }

  @Get('/user/callback/google')
  @Render('callback')
  async handleAuth() {
    return { message: 'Hello world!' };
  }


  @Get('create-post')
  @Render('createPost')
  createPost(@Res() res: Response) {
    return { layout: 'main', message: 'create_post', footer: true};
  }

  @Get('create-category')
  @Render('createCategory')
  createCategory(@Res() res: Response) {
    return { layout: 'main', message: 'create_category', footer: true};
  }

  @Render('register')
  @Get('register')
  createUserч(@Res() res: Response) {
    return { layout: 'main', message: 'register'  };
  }

  @Render('authForm')
  @Get('auth-form')
  authForm(@Res() res: Response) {
    return { layout: 'main', message: 'authForm', footer: true};
  }
}

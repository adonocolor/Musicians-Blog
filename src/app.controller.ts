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
import { Session } from './auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { getUserById } from 'supertokens-node/lib/build/recipe/thirdparty';


@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('/index')
  @Render('index',)
  async getDefault(@Session() session?: SessionContainer) {
    const userId = session?.getUserId();
    if (userId !== undefined) {
      const user = await getUserById(userId);
      console.log(user.email);
      return { email: user.email };
    } else {
      return { email: null };
    }
  }

  @UseGuards(new AuthGuard({ sessionRequired: false }))
  @Get('')
  @Render('index')
  async getIndex(@Session() session?: SessionContainer) {
    const userId = session?.getUserId();
    if (userId !== undefined) {
      const user = await getUserById(userId);
      console.log(user.email);
      return { email: user.email };
    } else {
      return { email: null };
    }
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

  @Get('/user/callback/google')
  @Render('callback')
  async handleAuth() {
    return { message: 'Hello world!' };
  }


  @UseGuards(new AuthGuard({ sessionRequired: true }))
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
  createUser(@Res() res: Response) {
    return { layout: 'main', message: 'register'  };
  }

  @Render('authForm')
  @Get('auth-form')
  authForm(@Res() res: Response) {
    return { layout: 'main', message: 'authForm', footer: true};
  }
}

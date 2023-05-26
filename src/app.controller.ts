import { Controller, Get, HttpCode, HttpStatus, Render, UseGuards, UseInterceptors, Session } from "@nestjs/common";
import { AppService } from './app.service';
import {
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { SessionClaimValidator, SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from "./auth/auth/auth.guard";
import UserRoles from "supertokens-node/recipe/userroles";


@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/index')
  @Render('index')
  async getInd(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'index', footer: true};
  }

  @Get('')
  @Render('index')
  async getIndex(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'index', footer: true};
  }


  @Get('/contact')
  @Render('contact')
  getContact(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'contact', footer: false};
  }

  @Get('/posts')
  @Render('posts')
  getPosts(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'profile', footer: true};
  }

  @Get('/create')
  @Render('create')
  @UseGuards(new AuthGuard())
  async create(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'create', footer: true};
  }


  @Get('create-post')
  @Render('createPost')
  @UseGuards(new AuthGuard())
  createPost(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'create_post', footer: true};
  }

  @Get('create-category')
  @Render('createCategory')
  @UseGuards(new AuthGuard())
  createCategory(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'create_category', footer: true};
  }

  @Render('signup')
  @Get('signup')
  signup(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'signUp', footer: true};
  }

  @Render('signin')
  @Get('signin')
  signin(@Session() session: SessionContainer) {
    return { layout: 'main', message: 'signIn', footer: true};
  }
}

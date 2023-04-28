import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Render,
  Res,
  Response,
} from '@nestjs/common';
import { SupertokensService } from './supertokens/supertokens.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly supertokensService: SupertokensService) {}

  @Get('callback/google')
  @Render('callback')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getGoogleCallback(@Res() res: Response) {}
}

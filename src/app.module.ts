import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { PostModule } from './post/post.module';
import { Post } from "./post/entities/post.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "@hapi/joi";
import { Category } from "./category/entities/category.entity";
import { Comment } from "./comment/entities/comment.entity";
import { CommentModule } from "./comment/comment.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          User, Category, Comment, Post
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    PostModule,
    CommentModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
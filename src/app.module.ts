import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "./user/user.module";
import { User } from "./user/entities/user.entity";
import { PostModule } from './post/post.module';
import { Comment } from "./post/entities/comment.entity";
import { Post } from "./post/entities/post.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cgkmep4eoogkndjvlcm0-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'ado_web_sem_6_db_user',
      password: 'tjjkcgw0HqXt2tumdnJ9wvoq2ukBZG3w',
      database: 'ado_web_sem_6_db',
      entities: [User, Post, Comment],
      synchronize: false,
      ssl: {
        ca: process.env.SSL_CERT,
      },
      autoLoadEntities: true,
    }), UserModule, PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

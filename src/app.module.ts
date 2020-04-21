import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostsModule } from './module/posts/posts.module';
import { AdminModule } from './module/admin/admin.module';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://blogadmin:123456@localhost:27017/nest-blog-api", {
      useNewUrlParser: true
    }),
    PostsModule,
    AdminModule
  ]
})
export class AppModule {}

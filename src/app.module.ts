import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostsModule } from './module/posts/posts.module';
import { AdminModule } from './module/admin/admin.module';
import { AdminauthMiddleware } from './middleware/adminauth.middleware';
import { InitMiddleware } from './middleware/init.middleware';
import { Config } from './config/config';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://blogadmin:123456@localhost:27017/nest-blog-api", {
      useNewUrlParser: true
    }),
    PostsModule,
    AdminModule
  ],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes(`${Config.adminPath}/*`)
      .apply(InitMiddleware)
      .forRoutes('*');
  }
}

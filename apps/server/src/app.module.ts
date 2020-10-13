import { Module, 
  // NestModule, MiddlewareConsumer 
} from '@nestjs/common';
// import { PostsModule } from './posts/posts.module';
// import { AdminModule } from './admin/admin.module';
// import { AdminauthMiddleware } from './middleware/adminauth.middleware';
// import { InitMiddleware } from './middleware/init.middleware';
// import { Config } from './config/config';
// import { DbModule } from '@libs/db';
import { CoursesController } from './courses/courses.controller';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommonModule,
    // DbModule,
    // PostsModule,
    // AdminModule,
    CoursesModule,
    AuthModule,
    ActionsModule,
    CommentsModule
  ],
  providers: [],
  controllers: [CoursesController]
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AdminauthMiddleware)
//       .forRoutes(`${Config.adminPath}/*`)
//       .apply(InitMiddleware)
//       .forRoutes('*');
//   }
// }

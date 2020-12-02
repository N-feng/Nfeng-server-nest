// import { DbModule } from '@libs/db';
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { CoursesModule } from "./courses/courses.module";
import { EpisodesModule } from "./episodes/episodes.module";
import { MulterModule } from "@nestjs/platform-express";
import { CommonModule } from "@app/common";
import { GraphQLModule } from "@nestjs/graphql";
import { AppResolver } from "./app/app.resolver";

const MAO = require("multer-aliyun-oss");

@Module({
  imports: [
    CommonModule,
    // GraphQLModule.forRootAsync({
    //   useFactory: () => ({
    //     typePaths: ["./**/*.graphql"],
    //     // autoSchemaFile: 'schema.gql',
    //   }),
    // }),
    GraphQLModule.forRoot({ typePaths: ["./**/*.graphql"] }),
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
          // dest: 'uploads'
        };
      },
    }),
    // DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

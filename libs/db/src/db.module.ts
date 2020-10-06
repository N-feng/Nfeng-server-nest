import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episodes.model';

const models = TypegooseModule.forFeature([User, Course, Episode])

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://blogadmin:123456@localhost:27017/nest-blog-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}

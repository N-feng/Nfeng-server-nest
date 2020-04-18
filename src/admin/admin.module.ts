import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from './model/admin.model';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Admin, schemaOptions: { collection: 'admin' } }
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}

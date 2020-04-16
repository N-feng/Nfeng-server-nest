import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from './admin.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Admin, schemaOptions: { collection: 'admin' } }
    ])
  ],
  controllers: [AdminController]
})
export class AdminModule {}

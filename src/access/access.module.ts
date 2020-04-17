import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Access } from './access.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Access, schemaOptions: { collection: 'access' } }
    ])
  ],
  controllers: [AccessController]
})
export class AccessModule {}

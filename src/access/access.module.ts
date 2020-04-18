import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Access } from './model/access.model';
import { AccessService } from './access.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Access, schemaOptions: { collection: 'access' } }
    ])
  ],
  controllers: [AccessController],
  providers: [AccessService]
})
export class AccessModule {}

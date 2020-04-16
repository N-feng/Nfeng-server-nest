import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypegooseModule } from 'nestjs-typegoose'
import { Role } from './role.model'

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Role, schemaOptions: { collection: 'role' } }
    ])
  ],
  controllers: [RoleController]
})
export class RoleModule {}

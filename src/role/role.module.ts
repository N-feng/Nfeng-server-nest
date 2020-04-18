import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypegooseModule } from 'nestjs-typegoose'
import { Role } from './model/role.model'
import { RoleService } from './role.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Role, schemaOptions: { collection: 'role' } }
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}

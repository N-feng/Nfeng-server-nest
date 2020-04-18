import { Module } from '@nestjs/common';
import { RoleAccessController } from '../role-access.controller';
import { TypegooseModule } from 'nestjs-typegoose'
import { RoleAccess } from '../role-access.model'
import { RoleAccessService } from '../role-access.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: RoleAccess, schemaOptions: { collection: 'role_access' } }
    ])
  ],
  controllers: [RoleAccessController],
  providers: [RoleAccessService]
})
export class RoleAccessModule {}

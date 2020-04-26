import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Role } from '../../model/role.model';
import { Auth } from '../../model/auth.model';
import { Access } from '../../model/access.model';
import { RoleAccess } from '../../model/role-access.model';

import { RoleController } from './role/role.controller';
import { AccessController } from './access/access.controller'
import { RoleAccessController } from './role-access/role-access.controller';

import { ToolsService } from '../../service/tools/tools.service';
import { AuthService } from '../../service/auth/auth.service';
import { RoleService } from '../../service/role/role.service';
import { AccessService } from '../../service/access/access.service';
import { RoleAccessService } from '../../service/role-access/role-access.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Role, schemaOptions: { collection: 'role' } },
      { typegooseClass: Auth, schemaOptions: { collection: 'auth' } },
      { typegooseClass: Access, schemaOptions: { collection: 'access' } },
      { typegooseClass: RoleAccess, schemaOptions: { collection: 'role_access' } }
    ])
  ],
  controllers: [RoleController, AuthController, AccessController, RoleAccessController],
  providers: [RoleService, AuthService, AccessService, RoleAccessService, ToolsService]
})
export class AdminModule {}

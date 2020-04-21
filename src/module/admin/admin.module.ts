import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Role } from '../../model/role.model';
import { Admin } from '../../model/admin.model';
import { Access } from '../../model/access.model';
import { RoleAccess } from '../../model/role-access.model';

import { RoleController } from './role/role.controller';
import { ManagerController } from './manager/manager.controller';
import { AccessController } from './access/access.controller'
import { RoleAccessController } from './role-access/role-access.controller';

import { AdminService } from '../../service/admin/admin.service';
import { RoleService } from '../../service/role/role.service';
import { AccessService } from '../../service/access/access.service';
import { RoleAccessService } from '../../service/role-access/role-access.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Role, schemaOptions: { collection: 'role' } },
      { typegooseClass: Admin, schemaOptions: { collection: 'admin' } },
      { typegooseClass: Access, schemaOptions: { collection: 'access' } },
      { typegooseClass: RoleAccess, schemaOptions: { collection: 'role_access' } }
    ])
  ],
  controllers: [RoleController, ManagerController, AccessController, RoleAccessController],
  providers: [RoleService, AdminService, AccessService, RoleAccessService ]
})
export class AdminModule {}

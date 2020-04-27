import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Role } from '../../model/role.model';
import { Auth } from '../../model/auth.model';
import { Access } from '../../model/access.model';
import { RoleAccess } from '../../model/role_access.model';
import { GoodsType } from '../../model/goods_type.model';
import { GoodsTypeAttribute } from '../../model/goods_type_attribute.model';
import { GoodsCate } from '../../model/goods_cate.model';

import { RoleController } from './role/role.controller';
import { AuthController } from './auth/auth.controller';
import { AccessController } from './access/access.controller'
import { RoleAccessController } from './role-access/role-access.controller';
import { GoodsTypeController } from './goods-type/goods-type.controller';
import { GoodsTypeAttributeController } from './goods-type-attribute/goods-type-attribute.controller';
import { GoodsCateController } from './goods-cate/goods-cate.controller';

import { ToolsService } from '../../service/tools/tools.service';
import { AuthService } from '../../service/auth/auth.service';
import { RoleService } from '../../service/role/role.service';
import { AccessService } from '../../service/access/access.service';
import { RoleAccessService } from '../../service/role-access/role-access.service';
import { GoodsTypeService } from '../../service/goods-type/goods-type.service';
import { GoodsTypeAttributeService } from '../../service/goods-type-attribute/goods-type-attribute.service';
import { GoodsCateService } from '../../service/goods-cate/goods-cate.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Role, schemaOptions: { collection: 'role' } },
      { typegooseClass: Auth, schemaOptions: { collection: 'auth' } },
      { typegooseClass: Access, schemaOptions: { collection: 'access' } },
      { typegooseClass: RoleAccess, schemaOptions: { collection: 'role_access' } },
      { typegooseClass: GoodsType, schemaOptions: { collection: 'goods_type' } },
      { typegooseClass: GoodsTypeAttribute, schemaOptions: { collection: 'goods_type_attribute' } },
      { typegooseClass: GoodsCate, schemaOptions: { collection: 'goods_cate' } }
    ])
  ],
  controllers: [RoleController, AuthController, AccessController, RoleAccessController, GoodsTypeController, GoodsTypeAttributeController, GoodsCateController],
  providers: [RoleService, AuthService, AccessService, RoleAccessService, ToolsService, GoodsTypeService, GoodsTypeAttributeService, GoodsCateService]
})
export class AdminModule {}

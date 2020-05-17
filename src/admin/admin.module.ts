import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { Role } from '../model/role.model';
import { User } from '../model/user.model';
import { Access } from '../model/access.model';
import { RoleAccess } from '../model/role_access.model';
import { GoodsType } from '../model/goods_type.model';
import { GoodsTypeAttribute } from '../model/goods_type_attribute.model';
import { GoodsCate } from '../model/goods_cate.model';
import { Goods } from '../model/goods.model';
import { GoodsColor } from '../model/goods_color.model';
import { GoodsImage } from '../model/goods_image.model';
import { GoodsAttr } from '../model/goods_attr.model'

import { RoleController } from './role/role.controller';
import { UserController } from './user/user.controller';
import { AccessController } from './access/access.controller'
import { RoleAccessController } from './role-access/role-access.controller';
import { FocusController } from './focus/focus.controller';
import { GoodsTypeController } from './goods-type/goods-type.controller';
import { GoodsTypeAttributeController } from './goods-type-attribute/goods-type-attribute.controller';
import { GoodsCateController } from './goods-cate/goods-cate.controller';
import { GoodsColorController } from './goods-color/goods-color.controller';
import { GoodsController } from './goods/goods.controller';
import { EnumController } from './enum/enum.controller';

import { ToolsService } from './tools/tools.service';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { AccessService } from './access/access.service';
import { RoleAccessService } from './role-access/role-access.service';
import { GoodsTypeService } from '../service/goods-type/goods-type.service';
import { GoodsTypeAttributeService } from '../service/goods-type-attribute/goods-type-attribute.service';
import { GoodsCateService } from '../service/goods-cate/goods-cate.service';
import { GoodsColorService } from '../service/goods-color/goods-color.service';
import { GoodsService } from '../service/goods/goods.service';
import { GoodsImageService } from '../service/goods-image/goods-image.service';
import { GoodsAttrService } from '../service/goods-attr/goods-attr.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Role, schemaOptions: { collection: 'role' } },
      { typegooseClass: User, schemaOptions: { collection: 'user' } },
      { typegooseClass: Access, schemaOptions: { collection: 'access' } },
      { typegooseClass: RoleAccess, schemaOptions: { collection: 'role_access' } },
      { typegooseClass: GoodsType, schemaOptions: { collection: 'goods_type' } },
      { typegooseClass: GoodsTypeAttribute, schemaOptions: { collection: 'goods_type_attribute' } },
      { typegooseClass: GoodsCate, schemaOptions: { collection: 'goods_cate' } },
      { typegooseClass: Goods, schemaOptions: { collection: 'goods' } },
      { typegooseClass: GoodsColor, schemaOptions: { collection: 'goods_color' } },
      { typegooseClass: GoodsImage, schemaOptions: { collection: 'goods_image' } },
      { typegooseClass: GoodsAttr, schemaOptions: { collection: 'goods_attr' } }
    ])
  ],
  controllers: [RoleController, UserController, AccessController, RoleAccessController, FocusController, GoodsTypeController, GoodsTypeAttributeController, GoodsCateController, GoodsColorController, GoodsController, EnumController],
  providers: [RoleService, UserService, AccessService, RoleAccessService, ToolsService, GoodsTypeService, GoodsTypeAttributeService, GoodsCateService, GoodsColorService, GoodsService, GoodsImageService, GoodsAttrService],
  exports: [RoleAccessService]
})
export class AdminModule {}

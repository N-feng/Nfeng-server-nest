import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Admin as AdminSchema } from '../../model/admin.model';
import { CreateAdminDto } from '../../dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(AdminSchema) private readonly adminModel: ModelType<AdminSchema>) {}

  async find(body) {
    return await this.adminModel.find(body)
  }

  async create(body: CreateAdminDto) {
    await this.adminModel.create(body)
  }

  async update(id: string, body: CreateAdminDto) {
    return await this.adminModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.adminModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.adminModel
  }
}

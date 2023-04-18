import { Injectable } from '@nestjs/common';
import { CreatePermissionRoleDto } from './create-permission-role.dto';
import { UpdatePermissionRoleDto } from './update-permission-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRoleEntity } from './permission-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRoleService {
  constructor(
    @InjectRepository(PermissionRoleEntity)
    private companyRepository: Repository<PermissionRoleEntity>,
  ) {}
  
  async create(createPermissionRoleDto: CreatePermissionRoleDto) {
    const permissionRole = this.companyRepository.create(createPermissionRoleDto);
    await this.companyRepository.save(createPermissionRoleDto);
    return permissionRole;
  }

  findAll() {
    return `This action returns all permissionRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionRole`;
  }

  update(id: number, updatePermissionRoleDto: UpdatePermissionRoleDto) {
    return `This action updates a #${id} permissionRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionRole`;
  }
}

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
    private permissionRoleRepository: Repository<PermissionRoleEntity>,
  ) {}
  
  async create(createPermissionRoleDto: CreatePermissionRoleDto) {
    const permissionRole = this.permissionRoleRepository.create(createPermissionRoleDto);
    await this.permissionRoleRepository.save(createPermissionRoleDto);
    return permissionRole;
  }

  async findAll() {
    return await this.permissionRoleRepository.find(
      { where: { roleStatus: 1 } }
    );
  }

  async findById(id: number): Promise<PermissionRoleEntity> {
    return await this.permissionRoleRepository.findOne({ id });
  }

  async update(id: number, updatePermissionRoleDto: UpdatePermissionRoleDto) {
    await this.permissionRoleRepository.update({ id }, updatePermissionRoleDto);
    return await this.permissionRoleRepository.findOne({ id });
  }

}

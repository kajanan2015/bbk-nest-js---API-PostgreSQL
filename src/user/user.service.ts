import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult,Not } from 'typeorm';

import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './user.dto';
import { PermissionRoleService } from 'src/permission-role/permission-role.service';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PermissionRoleEntity)
    private readonly permissionRoleRepository: Repository<PermissionRoleEntity>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { status: 1,uType: Not('ADMIN') }, 
    });
  }

  async find(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id:id, status: 1  } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email:email,status: 1  } });
  }
// we added same login for employee and admin, we need to identify uniquly employee data, that why we pass employee id
  async create(data:CreateUserDto){
    const newhashpassword = await this.hashPassword(data.password);
    const user = {
      ...data,
      password: newhashpassword,
      uType:"CADMIN"
    };
    return await this.userRepository.save(user);
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }

  async update(id: number, data: Partial<User>) {
    if(data.password){
      const newhashpassword = await this.hashPassword(data.password);
      const user = {
        ...data,
        password: newhashpassword,
      };
    }
    await this.userRepository.update({ id : id }, data);
    return await this.userRepository.findOne({ where: {  id : id } });
  }

  async updateUserStatus(id:number,status:string):Promise<void>{
    await this.userRepository
    .createQueryBuilder()
    .update(User)
    .set({ status: status })
    .where({id:id})
    .execute();
  }

  async updateEmployeePassword(id: number, employeeupdatedata: Partial<User>) {
    let user
    if(employeeupdatedata.password){
      const newhashpassword = await this.hashPassword(employeeupdatedata.password);
      let user = {
        ...employeeupdatedata,
        password: newhashpassword,
      };
    }else{
      const { password, ...dataWithoutPassword } = employeeupdatedata;
      let user = {
        ...dataWithoutPassword,
      };
    }
    
// return ;
    await this.userRepository.update({ id : id }, user);
    return await this.userRepository.findOne({ where: {  id : id } });
  }

  async addRoleToEmployee(employeeId: number, roleIds: number[]): Promise<void> {
    const employee = await this.userRepository.findOne(employeeId, {
      relations: ['roles'],
    });
  
    console.log(employeeId,11)
    console.log(roleIds,22)
    const existingRoles = employee.roles.map((role) => role.id);
    const newRoles = roleIds.filter((roleId) => !existingRoles.includes(roleId));
  
    if (newRoles.length !== roleIds.length) {
      const missingroleIds = roleIds.filter((roleId) => !newRoles.includes(roleId));
      throw new NotFoundException(`Already selected ${missingroleIds.join(',')}`);
    }
  
    const rolesToAdd = await this.permissionRoleRepository.findByIds(newRoles);
  
    employee.roles.push(...rolesToAdd);
    await this.userRepository.save(employee);
  }
  
}

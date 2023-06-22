import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, Not } from 'typeorm';

import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './user.dto';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PermissionRoleEntity)
    private readonly permissionRoleRepository: Repository<PermissionRoleEntity>,
  ) { }

  async getCompaniesByUserId(userId: number): Promise<CompaniesEntity[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['companies', 'companies.country'],
    });
    return user.companies;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { status: 1, uType: Not('ADMIN') },
    });
  }

  async findjob(id: number) {
    const job = await this.userRepository.findOne({ where: { id: id, status: 1 }, relations: ['jobdata', 'jobdata.vehicle', 'jobdata.vehicle.vehicletype'] });
    delete job.password;
    return job
  }

  async findUsingId(id): Promise<User[]> {
    // return await this.userRepository.findOne({ where: { id:id, status: 1 },relations:['jobdata']  });
    const users = await this.userRepository.findByIds(id);
    return users
  }

  async find(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id, status: 1 }, relations: ['jobdata'] });
  }
  
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email:email,status: 1,activate:1} });
  }

  async findByEmailexist(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email:email} });
  }
  // we added same login for employee and admin, we need to identify uniquly employee data, that why we pass employee id
  async create(data) {
    const newhashpassword = await this.hashPassword(data.password);
    const user = {
      ...data,
      password: newhashpassword,

    };
    return await this.userRepository.save(user);
  }




  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }

  async update(id: number, data: Partial<User>) {
    console.log(data, 877878787878787878)
    let user = data;
    if (data.password) {
      const newhashpassword = await this.hashPassword(data.password);
      user = {
        ...data,
        password: newhashpassword,
      };
    }
    await this.userRepository.update({ id: id }, user);
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async updateUserStatus(id: number, status: string): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: status })
      .where({ id: id })
      .execute();
  }

  async updateEmployeePassword(id: number, employeeupdatedata: Partial<User>) {
    let user
    if (employeeupdatedata.password) {
      const newhashpassword = await this.hashPassword(employeeupdatedata.password);
      let user = {
        ...employeeupdatedata,
        password: newhashpassword,
      };
    } else {
      const { password, ...dataWithoutPassword } = employeeupdatedata;
      let user = {
        ...dataWithoutPassword,
      };
    }

    // return ;
    await this.userRepository.update({ id: id }, user);
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async updateRolesForEmployee(employeeId: number, roleIds: number[]): Promise<void> {
    const employee = await this.userRepository.findOne(employeeId, {
      relations: ['roles'],
    });

    console.log(employeeId, 11);
    console.log(roleIds, 22);

    const existingRoles = employee.roles.map((role) => role.id);
    const rolesToRemove = existingRoles.filter((roleId) => !roleIds.includes(roleId));
    const rolesToAdd = roleIds.filter((roleId) => !existingRoles.includes(roleId));

    if (rolesToRemove.length) {
      employee.roles = employee.roles.filter((role) => !rolesToRemove.includes(role.id));
      await this.userRepository.save(employee);
    }

    if (rolesToAdd.length) {
      const rolesToAddEntities = await this.permissionRoleRepository.findByIds(
        rolesToAdd
      );
      employee.roles.push(...rolesToAddEntities);
    }

    await this.userRepository.save(employee);
  }

  async getEmployeeRoleIds(employeeId: number): Promise<number[]> {
    const employee = await this.userRepository.findOne(employeeId, {
      relations: ['roles'],
    });

    const roleIds = employee.roles.map((role) => role.id);
    console.log(roleIds, 5555)
    return roleIds;
  }

  async findoneuserdata(id) {
    const users = await this.userRepository.findOne(id);
    return users
  }

// new admin create
  async create_new_admin(id: number, data) {
    const newhashpassword = await this.hashPassword(data.password);
    
   const user={
    ...data,
    password: newhashpassword,
   }
    
    if (data.companyType == "subcompany") {
     user.uType= "SADMIN";
    } else if (data.companyType == "maincompany") {
      user.uType= "CADMIN";
    }else{
      
    }
    const company = await this.companyRepository.findOne(id);
    user.companies = [company];
    return await this.userRepository.save(user);
  }

// password change
  async changepassword(id,data){
    if(data.newPassword==data.confirmPassword){
      const newhashpassword = await this.hashPassword(data.newPassword);
      const currentDateTime = new Date();
      const user={
        password:newhashpassword,
        firsttimepasswordchange:1,
        updatedat:currentDateTime
      }
      await this.userRepository.update({ id }, user);
      return 'change'
    }else{
      return "notchange"
    }
   
  }
}

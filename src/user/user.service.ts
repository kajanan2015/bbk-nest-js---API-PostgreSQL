import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async find(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
// we added same login for employee and admin, we need to identify uniquly employee data, that why we pass employee id
  async create(name: string, email: string, password: string, usertype: string, employee_id:number, driver_id:number): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.utype = usertype;
    user.emp_id = employee_id;
    user.drv_id = driver_id;
    user.password = await this.hashPassword(password);
    return await this.userRepository.save(user);
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }


  async update(id: string, data: Partial<User>) {
    await this.userRepository.update({ email : id }, data);
    return await this.userRepository.findOne({ where: {  email : id } });
  }

  async updateEmployeePassword(id: number, employeeupdatedata: Partial<User>) {
    const user = new User();
    user.name = employeeupdatedata.name;
    user.email = employeeupdatedata.email;
    if(employeeupdatedata.password){
      user.password = await this.hashPassword(employeeupdatedata.password);
    }
    
// return ;
    await this.userRepository.update({ emp_id : id }, user);
    return await this.userRepository.findOne({ where: {  emp_id : id } });
  }
  
}

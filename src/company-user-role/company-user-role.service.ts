import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCompanyUserRoleDto } from "./create-company-user-role.dto";
import { UpdateCompanyUserRoleDto } from "./update-company-user-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyUserRole } from "./company-user-role.entity";
import { FindOneOptions, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { CompaniesEntity } from "src/companies/companies.entity";
import { MailService } from "src/mail/mail.service";
@Injectable()
export class CompanyUserRoleService {
  constructor(
    @InjectRepository(CompanyUserRole)
    private CompanyUserRepository: Repository<CompanyUserRole>,
    private readonly userservice: UserService,
    private readonly mailservice: MailService,
    @InjectRepository(CompaniesEntity)
    private readonly companyRepo:Repository<CompaniesEntity>
    ) {}

  async create(data,prflogothumb,base_url) {
    
    let newhashpassword;
    if (data.password) {
      newhashpassword = await this.hashPassword(data.password);
    }

    const user = {
      ...data,
      password: newhashpassword,
    };
    const companyuser = this.CompanyUserRepository.create(user);
    await this.CompanyUserRepository.save(companyuser);
    const companydata=await this.companyRepo.findByIds(data.companyid)
    const adminData = {
      firstName: data.userName,
      uType: "ADMIN",
      profilePic: data.profilePicture,
      profilePicThumb: prflogothumb,
      password: data.password,
      phone: data.userPhone,
      email: data.userEmail,
      companies:companydata
    };
    const adminResponse = await this.userservice.create(adminData);
     await this.mailservice.newadminadded(adminResponse.email, "", adminResponse.firstName, adminResponse.password, base_url);
    if (adminResponse) {
      return {
        statusCode: HttpStatus.OK,
        message: "successs",
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "failed",
      };
    }
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }

  async findAll(): Promise<CompanyUserRole[]> {
    return this.CompanyUserRepository.find();
  }

  async findOne(id): Promise<CompanyUserRole> {
    return this.CompanyUserRepository.findOne(id);
  }

  async update(id: number, data) {
    console.log(id, 9898);
    if (data.password) {
      const hashedPassword = await this.hashPassword(data.password);
      data.password = hashedPassword;
    }

    console.log(data, 8908989);
    const updateResult = await this.CompanyUserRepository.update({ id }, data);
    console.log(updateResult, 9898989);
    if (updateResult) {
      return {
        statusCode: HttpStatus.OK,
        message: "successs",
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "failed",
      };
    }
  }

  async remove(id: number): Promise<void> {
    await this.CompanyUserRepository.delete(id);
  }
}

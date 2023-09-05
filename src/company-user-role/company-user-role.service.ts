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
    private readonly companyRepo: Repository<CompaniesEntity>
  ) { }

  async create(data, prflogothumb, base_url) {

    const existing = await this.userservice.findByEmailexist(data.userEmail);
    if (existing) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 301,
      };
    }

    const user = {
      ...data
    };
    const companyuser = this.CompanyUserRepository.create(user);
    await this.CompanyUserRepository.save(companyuser);
    const companydata = await this.companyRepo.findByIds(data.companyid)
    const adminData = {
      firstName: data.userName,
      uType: data.uType,
      profilePic: data.profilePicture,
      profilePicThumb: prflogothumb,
      password: data.password,
      phone: data.userPhone,
      email: data.userEmail,
      companies: companydata
    };

    const adminResponse = await this.userservice.create(adminData);
    await this.mailservice.newadminadded(adminResponse.email, "", adminResponse.firstName, adminData.password, base_url);
    if (adminResponse) {
      return {
        statusCode: HttpStatus.OK,
        message: 200,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 500,
      };
    }
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }

  async findAll(id) {
    return this.CompanyUserRepository.find({ where: { company: id } });
  }

  async findOne(id): Promise<CompanyUserRole> {
    return this.CompanyUserRepository.findOne(id);
  }

  async update(id: number, data) {
    if (data.userEmail) {
      const existing = await this.userservice.findByEmailexist(data.userEmail);
      if (existing) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 301,
        };
      }
    }

    const userdata=await this.CompanyUserRepository.findOne(id)
    const adminData = {
      ...(data.userName ? { firstName: data.userName } : {}),
      ...(data.profilePicture ? { profilePic: data.profilePic } : {}),
      ...(data.prflogothumb ? { profilePicThumb: data.prflogothumb } : {}),
      ...(data.password ? { password: data.password } : {}),
      ...(data.userPhone ? { phone: data.userPhone } : {}),
      ...(data.userEmail ? { email: data.userEmail } : {})
    };
  const userprofile= await this.userservice.findByEmailexist(userdata.userEmail);
  const updateadmindata= await this.userservice.update(userprofile.id,adminData)

 delete data.password;

    const updateResult = await this.CompanyUserRepository.update({ id }, data);
   
    if (updateadmindata) {
      return {
        statusCode: HttpStatus.OK,
        message: 200,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 500,
      };
    }
  }

  async remove(id: number): Promise<void> {
    await this.CompanyUserRepository.delete(id);
  }

  async findbyusertype(type){
    return await this.userservice.finduserbyusertype(type)
  }
}

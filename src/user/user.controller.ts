import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';


const stripe = require('stripe')('sk_test_51LfvAGChovVblxJg8YUMSd7MefCrw6DieaPiEusH7iH8egteszfyE6bhYYu9p4PePiMdMq3fXLjdwdXKmrZSwcF600fzMShJHz');


import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { create } from 'domain';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private service: UserService, private imageUploadService: ImageUploadService) { }

  @Get('/usercompany/:id')
  async getUserCompanies(@Param('id') id: number): Promise<CompaniesEntity[]> {
    return this.service.getCompaniesByUserId(id);
  }

  @Put('/edit/:id')
  async uppdate(@Param('id') id: number, @Body() data: any) {
    await this.service.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Get('getjob/:id')
  async getjob(@Param('id') id: number) {

    const user = await this.service.findjob(id);
    return {
      statusCode: HttpStatus.OK,
      user,
    };
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    const user = await this.service.find(id);
    return {
      statusCode: HttpStatus.OK,
      user,
    };
  }

  @Post('roles/:employeeId')
  async updateRolesForEmployee(
    @Param('employeeId') employeeId: number,
    @Body('roleIds') roleIds,
  ) {
    console.log(employeeId, 33)
    console.log(roleIds, 44)
    await this.service.updateRolesForEmployee(employeeId, roleIds);
  }

  @Get('roles/:employeeId')
  async getEmployeeRoleIds(@Param('employeeId') employeeId: number): Promise<number[]> {
    return await this.service.getEmployeeRoleIds(employeeId);
  }

  @Post('/strip')
  async stripcreate(@Body() data: any) {


    const customer = await stripe.customers.create({
      description: new Date(),
      email: data.user.email,
      name: data.user.name,
    });

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: data.cnumber,
        exp_month: data.month,
        exp_year: data.year,
        cvc: data.cvc,
      },
    });



    const paymentMethodAdd = await stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: customer.id }
    );

    const customer1 = await stripe.customers.update(
      customer.id,
      { invoice_settings: { default_payment_method: paymentMethod.id } }
    );



    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        { price: 'price_1LiQSVChovVblxJgToISRMMR' },
      ],
    });

    return {
      statusCode: HttpStatus.OK,
      customer
    };
  }

  // use t6hese below api to create new admin according to compnay wise

  @Post('createuser')
  @UseInterceptors(AnyFilesInterceptor())
  async createuser(@UploadedFiles() profileImg, @Body() data: any) {
    console.log(profileImg, 1234)
    console.log(data, 456)
    // const createuser=await this.service.create(data);
    // return createuser;
  }
  @Get('oneuserdata/:id')
  async oneuserdata(@Param('id') id: number) {
    const user = await this.service.findoneuserdata(id);
    return {
      statusCode: HttpStatus.OK,
      user,
    };
  }

  // update one by one admin
  @Put('/updateuserdataone/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateeditdata(@Param('id') id: number, @UploadedFiles() profileImg, @Body() data: any) {
    let profileImage;
    let profilethumb;
    if (profileImg.length > 0) {
      profileImage = await this.imageUploadService.upload(profileImg, 'body')
      profilethumb = await this.imageUploadService.uploadThumbnailToS3(profileImage[0]);
    }

    const passdata = {
      ...(data.firstName ? { firstName: data.firstName } : {}),
      ...(data.lastName ? { lastName: data.lastName } : {}),
      ...(data.email ? { email: data.email, activate: false, activated_time: null } : {}),
      ...(data.password ? { password: data.password } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(profileImage
        ? { profilePic: profileImage, profilePicThumb: profilethumb }
        : {}),
    }

    await this.service.update(id, passdata);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  // create user by one company
  @Post('/updatenewadminforcompany/:companyid')
  @UseInterceptors(AnyFilesInterceptor())
  async updatenewadminforcompany(@Param('companyid') id: number, @UploadedFiles() profileImg, @Body() data: any) {
    let profileImage;
    let profilethumb;
    if (profileImg.length > 0) {
      profileImage = await this.imageUploadService.upload(profileImg, 'body')
      profilethumb = await this.imageUploadService.uploadThumbnailToS3(profileImage[0]);
    }

    const passdata = {
      ...data,
      ...(profileImage
        ? { profilePic: profileImage, profilePicThumb: profilethumb }
        : {}),
    }
    await this.service.create_new_admin(id, passdata);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
    };
  }

  // to check email exist
  @Post('employeecheck')
  async checkemailexist(@Body() data: any) {
    const existing = await this.service.findByEmailexist(data.email);
    if (existing) {
      return 301;
    } else {
      return 307
    }
  }

  // change password
  @Put('changepassword/:id')
  async changepassword(@Param('id') id, @Body() data: any) {
    console.log(id)
    return await this.service.changepassword(id, data);
  }

  // ** Get user data belongs to the department
  @Get('department-user/:departmentId')
  async departmentUser(@Param('departmentId') departmentId: number) {
    const depUser = await this.service.findDepartmentUser(departmentId);
    return {
      statusCode: HttpStatus.OK,
      depUser,
    };
  }
}
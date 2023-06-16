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

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

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
    console.log(employeeId,33)
    console.log(roleIds,44)
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
      email :data.user.email,
      name :data.user.name,
    });

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: data.cnumber,
        exp_month:data.month,
        exp_year: data.year,
        cvc: data.cvc,
      },
    });

    

    const paymentMethodAdd = await stripe.paymentMethods.attach(
      paymentMethod.id,
      {customer: customer.id}
    );

    const customer1 = await stripe.customers.update(
      customer.id,
      {invoice_settings: {default_payment_method: paymentMethod.id}}
    );

    

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {price: 'price_1LiQSVChovVblxJgToISRMMR'},
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
  async createuser(@UploadedFiles() profileImg, @Body() data:any){
    console.log(profileImg,1234)
    console.log(data,456)
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
   console.log(profileImg,1234)
   console.log(data,456)
   
    // await this.service.update(id, data);
    // return {
    //   statusCode: HttpStatus.OK,
    //   message: 'User updated successfully',
    // };
  }

// to check email exist
  @Get('employeecheck')
  async checkemailexist(@Body() data:any){
    const existing = await this.service.findByEmail(data.email);
    if (existing) {
      return "account exist";
    }
  }
}
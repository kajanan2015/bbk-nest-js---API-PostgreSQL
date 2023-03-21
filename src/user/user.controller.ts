import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';


const stripe = require('stripe')('sk_test_51LfvAGChovVblxJg8YUMSd7MefCrw6DieaPiEusH7iH8egteszfyE6bhYYu9p4PePiMdMq3fXLjdwdXKmrZSwcF600fzMShJHz');


import { UserService } from './user.service';



@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  

  @Put('/edit/:id')
  async uppdate(@Param('id') id: string, @Body() data: any) {

    console.log(id, 'ranga')
    await this.service.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    const customer = await stripe.customers.create({
      description: new Date(),
      email :'itranga@gmail.com',
      name :'Ranga'
    });


    const user = await this.service.find(id);
    return {
      statusCode: HttpStatus.OK,
      user,
    };
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

  
}
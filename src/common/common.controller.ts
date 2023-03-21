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




import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private service: CommonService) { }


  @Get("/toapprover")
  async sendEmailToApprover() {
    const user = await this.service.sendEmailToApprover();
    return {
      statusCode: HttpStatus.OK,
      user,
    };
  }
 

  @Get('/abn/:num')
  async sendemail(@Param('num') num: string) {



    const abn = await this.service.abn(num);

    return {
      statusCode: HttpStatus.OK,
      abn
    };
  }

  @Post('/dulicate')
  async dulicate(@Body() data: any) {



    const abn = await this.service.dulicate(data.id);

    return {
      statusCode: HttpStatus.OK,
      abn
    };
  }

 




}



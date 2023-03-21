import { ConsoleLogger, Injectable, StreamableFile } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {lookupABN} from 'aus-abr';
import { Connection } from 'typeorm';



import { MailService } from "../mail/mail.service";






@Injectable()
export class CommonService {

  

  constructor(private mailService: MailService , @InjectConnection() private readonly connection: Connection) { }


  async dulicate(id:number) {
    return this.connection.query('SELECT * FROM USERS');
  }



  async sendEmailToApprover() {
    

      await this.mailService.sendCustomerConfirmation();

   
  }

 

  async abn(abn: string) {

    const details = await lookupABN(abn);
    return details;

    



  }

  
 

 
 
 



}

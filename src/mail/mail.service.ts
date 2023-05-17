import { MailerService } from "@nestjs-modules/mailer";
import { Repository, getManager } from "typeorm";

const nodemailer = require("nodemailer");

import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendcompanyCreate(
    password: string,
    name: string,
    toemail: string,
    username: string
  ) {
    if(password==""||username==""){
      await this.mailerService.sendMail({
        to: toemail.trim(),
        from: "noreply@hexagonasia.com", // override default from
        subject: `Login Credentials for BBK Application`,
        template: "./companysameadmin", // `.hbs` extension is appended automatically
        context: {
          name,
          username,
          password,
        },
      });
    }else{
      await this.mailerService.sendMail({
        to: toemail.trim(),
        from: "noreply@hexagonasia.com", // override default from
        subject: `Login Credentials for BBK Application`,
        template: "./companyconfirmation", // `.hbs` extension is appended automatically
        context: {
          name,
          username,
          password,
        },
      });
    }
    
  }

  async sendCustomerConfirmation() {


    
    await this.mailerService.sendMail({
      to: "nuwanpriyamal@gmail.com ",
      from: "nuwan@intaap.com", // override default from
      subject: `tset`,
      template: "./customer", // `.hbs` extension is appended automatically
      context: {},
    });
  }

  async sendApprover(data: any, supName: string) {
    const entityManager = getManager();
    const emailData = await entityManager.query(
      `SELECT emailadd FROM email Where companyId= ${data.companyId} and programtypeId= ${data.programtypeId}`
    );

    await this.mailerService.sendMail({
      to: data.user.email,
      cc: emailData[0] ? emailData[0].emailadd : "",
      subject: `You ${data.programtype.typedes} has approved by ${data.approver.userName}`,
      template: "/templates/approve", // `.hbs` extension is appended automatically
      context: {
        name: data.user.userName,
        supName,
        text: `You ${data.programtype.typedes} has approved by ${data.approver.userName}`,
        num: data.approvelog.num,
        date: data.approvelog.podate,
      },
    });
  }

  async cancelemail(data: any) {
    const entityManager = getManager();

    const emailData =
      await entityManager.query(`select distinct username,email from
    (SELECT b.userName,b.email
    FROM approvelog a
    inner join user b
    on  a.userId=b.id
    where a.companyId=3 and a.programtypeid=${data.programtypeId} and a.tranheaderId=${data.tranheaderId}
    union ALL
    SELECT b.userName,b.email
    FROM approvelog a
    inner join user b
    on  a.approverId=b.id
    where a.companyId= ${data.companyId} and a.programtypeid=${data.programtypeId} and a.tranheaderId=${data.tranheaderId}) x`);

    let emailString = null;

    for (const email of emailData) {
      if (emailString) {
        emailString = emailString + "," + email.email;
      } else {
        emailString = email.email;
      }
    }

    await this.mailerService.sendMail({
      to: emailString,
      //cc:emailData[0] ? emailData[0].emailadd : '',
      subject: `You ${data.programtype.typedes} has bean ${data.status} by ${data.approver.userName}`,
      template: "/templates/cancel", // `.hbs` extension is appended automatically
      context: {
        name: data.user.userName,
        text: `You ${data.programtype.typedes} has bean ${data.status} by ${data.approver.userName} for following reasons`,
        msg: data.msg,
        supName: data.supName,
        num: data.approvelog.num,
        date: data.approvelog.podate,
      },
    });
  }

  async sendDapp(email: string, obj: any, atype: string) {
    await this.mailerService.sendMail({
      to: email,
      from: "noreply@hexagonasia.com", // override default from
      subject: `Travel Information`,
      template: "/templates/dapp", // `.hbs` extension is appended automatically
      context: {
        obj,
        atype,
      },
    });
  }

  async sendSample(link: string, caption: string) {
    await this.mailerService.sendMail({
      to: "thushara@earthfoam.com , trevin@earthfoam.com",
      from: "noreply@hexagonasia.com", // override default from
      subject: caption,
      template: "/templates/sample", // `.hbs` extension is appended automatically
      context: {
        link,
      },
    });
  }

  async sendCron(link: string, link2: string, link3: string) {
    this.mailerService.sendMail({
      to: "januka@earthfoam.com,thushara@earthfoam.com,operation.lk@earthfoam.com,trevin@earthfoam.com,windana@earthfoam.com,eng.lk@earthfoam.com,ap.lk@earthfoam.com,production.lk@earthfoam.com,quality.lk@earthfoam.com,fabrication.lk@earthfoam.com,compound.lk@earthfoam.com,planning.lk@earthfoam.com,ar.lk@earthfoam.com,sahan@earthfoam.com,engop.lk@earthfoam.com",
      from: "noreply@hexagonasia.com", // override default from
      subject: "Production Summary , Energy and Fabrication Wastage report",
      template: "/templates/cron", // `.hbs` extension is appended automatically
      attachments: [
        {
          filename: "production_summary.pdf",
          path: link,
        },
        {
          filename: "energy_summary.pdf",
          path: link2,
        },
        {
          filename: "fabrication_waste.pdf",
          path: link3,
        },
      ],
      context: {},
    });
  }

  async sendCron2(link: string) {
    this.mailerService.sendMail({
      to: "januka@earthfoam.com,thushara@earthfoam.com,operation.lk@earthfoam.com,trevin@earthfoam.com,windana@earthfoam.com,eng.lk@earthfoam.com,ap.lk@earthfoam.com,production.lk@earthfoam.com,quality.lk@earthfoam.com,fabrication.lk@earthfoam.com,compound.lk@earthfoam.com,planning.lk@earthfoam.com,ar.lk@earthfoam.com,sahan@earthfoam.com,engop.lk@earthfoam.com",
      from: "noreply@hexagonasia.com", // override default from
      subject: "Wip Stock report",
      template: "/templates/cron2", // `.hbs` extension is appended automatically
      attachments: [
        {
          filename: "wip_stock.pdf",
          path: link,
        },
      ],
      context: {},
    });
  }

  async sendCron3(link: string) {
    this.mailerService.sendMail({
      to: "januka@earthfoam.com,thushara@earthfoam.com,operation.lk@earthfoam.com,trevin@earthfoam.com,windana@earthfoam.com,eng.lk@earthfoam.com,ap.lk@earthfoam.com,production.lk@earthfoam.com,quality.lk@earthfoam.com,fabrication.lk@earthfoam.com,compound.lk@earthfoam.com,planning.lk@earthfoam.com,ar.lk@earthfoam.com,sahan@earthfoam.com,engop.lk@earthfoam.com",
      from: "noreply@hexagonasia.com", // override default from
      subject: "Wip Stock report",
      template: "/templates/cron3", // `.hbs` extension is appended automatically
      attachments: [
        {
          filename: "wip_stock.pdf",
          path: link,
        },
      ],
      context: {},
    });
  }

  async crontest(link: string) {
    this.mailerService.sendMail({
      to: "itranga@gmail.com",
      from: "noreply@hexagonasia.com", 
      subject: "Wip Stock report",
      template: "/templates/test", 
      attachments: [
        {
          filename: "wip_stock.pdf",
          path: link,
        },
      ],
    });
  }


  async xlsx(link: string , data:any) {
    this.mailerService.sendMail({
      to: "kshevick@earthfoam.com,ezra.shevick@shevicksales.com,rmaziarz@shevicksales.com",
      bcc:"trevin@earthfoam.com",
      from: "noreply@hexagonasia.com", 
      subject: data.ordernum,
      template: "/templates/approval", 
      context: {
        ordernum : data.ordernum
      },
      attachments: [
        {
          filename: "dispatch-approval.xlsx",
          path: link,
        },
      ],
    });
  }  
}

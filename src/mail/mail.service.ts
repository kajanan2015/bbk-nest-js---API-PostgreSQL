import { MailerService } from "@nestjs-modules/mailer";
import { Repository, getManager } from "typeorm";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const nodemailer = require("nodemailer");

import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService,) { }


// generate paymentlink
async generatepaymentlink(companyemail, companyid,base_url,paymentid) {
  const payload = {
    email: companyemail,
    id: companyid,
    paymenttokenid:paymentid
  };

  const token = jwt.sign(payload,process.env.paymentlinkgeneratekey, { expiresIn: "48h" }); // Set expiration to 24 hours
  let link = base_url +'paymentpackage?token='+ token;
  
  return link
}


// payment link decode
async verifypaymentdetailstokendecode(key){
  try {
    const decoded = jwt.verify(key, process.env.paymentlinkgeneratekey);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Handle expired token error
      return 320;

    } else {
      // Handle other verification errors
      return 321;

    }
  }
}
  // password rest link send
  async sendresetlink(accountemail, userid,base_url) {
    const payload = {
      email: accountemail,
      id: userid
    };

    const token = jwt.sign(payload,process.env.passwordresetemailkey, { expiresIn: "5m" }); // Set expiration to 24 hours
    let link = base_url +'reset-password?token='+ token;
    console.log(token,343)
    console.log(link,232323233)
    await this.mailerService.sendMail({
      to: accountemail.trim(),
      from: "noreply@hexagonasia.com", // override default from
      subject: `Password Reset Link`,
      template: "./passwordreset", // `.hbs` extension is appended automatically
      context: {
        accountemail,
        link

      }
    });
    return 'success'
  }

  // check reset link validity
  async decodemyresettoken(key) {
    try {
      const decoded = jwt.verify(key, process.env.passwordresetemailkey);
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Handle expired token error
        return 320;

      } else {
        // Handle other verification errors
        return 321;

      }
    }
  }



  // check active url validity
  async decodemyactivatetoken(key) {
    try {
      const decoded = jwt.verify(key, process.env.activateemailkey);
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Handle expired token error
        return 320;

      } else {
        // Handle other verification errors
        return 321;

      }
    }
  }

  // send activation email url generate of admin
  async send_activation_email_admin(adminemail,base_url) {
    const payload = {
      email: adminemail
    };

    const token = jwt.sign(payload, process.env.activateemailkey, { expiresIn: '24h' }); // Set expiration to 24 hours
    let link = base_url +'verifyemail?token='+ token;
    return link;
  }

  // send verify email again
  async sendverifyemailagain(data,base_url) {
    const link = await this.send_activation_email_admin(data.email,base_url);
    const email = data.email
    const response=await this.mailerService.sendMail({
      to: `${data.email.trim()}`,
      from: "noreply@hexagonasia.com", // override default from
      subject: ` Welcome to BBK portal- Activaye account`,
      template: "./newactivateemail", // `.hbs` extension is appended automatically
      context: {
        //  data.name,
        email,
        link
      }
    });
    return "success"
  }

  // send activation email send
  async newadminadded(adminemail, companyname, adminname, adminpassword,base_url) {
    const link = await this.send_activation_email_admin(adminemail,base_url);

    await this.mailerService.sendMail({
      to: `${adminemail.trim()}`,
      from: "noreply@hexagonasia.com", // override default from
      subject: ` Welcome to ${companyname} Account - New Admin Access Granted`,
      template: "./activateemail", // `.hbs` extension is appended automatically
      context: {
        adminname,
        companyname,
        adminpassword,
        adminemail,
        link
      }
    });
  }
  // after succefully creation company send email to company email address defaul traial package is in their
  async companycreationsuccess(companyemail, adminemail, adminname, companyname, link) {
    await this.mailerService.sendMail({
      to: companyemail.trim(),
      from: "noreply@hexagonasia.com", // override default from
      subject: `Congratulation for Registering to BBK Application`,
      template: "./trialpackagecreate", // `.hbs` extension is appended automatically
      context: {
        adminname,
        adminemail,
        link,
        companyname

      }
    });
  }
  //  send payment link for added packages
  async trialpackageadded(companyemail, adminemail, adminname, companyname, link,companyid) {
    await this.mailerService.sendMail({
      to: companyemail.trim(),
      from: "noreply@hexagonasia.com", // override default from
      subject: `Continue Your Payemnts`,
      template: "./packagepaymentlink", // `.hbs` extension is appended automatically
      context: {
        link,
        companyname

      }
    });
  }
  // sub company creation send email to parent company
  async shareaccesstochildcompany(adminemail, adminname, companyname, parentcompanyname) {
    await this.mailerService.sendMail({
      to: adminemail.trim(),
      from: "noreply@hexagonasia.com", // override default from
      subject: `Access Granted: Welcome to ${companyname}`,
      template: "./shareaccesstochildofcmpanies", // `.hbs` extension is appended automatically
      context: {
        adminname,
        companyname,
        parentcompanyname
      }
    });
  }
  // update admin user credentials
  async updateemailforcompanydata(adminemail, companyname) {
    await this.mailerService.sendMail({
      to: adminemail.trim(),
      from: "noreply@hexagonasia.com", // override default from
      subject: `User Credentials Updated ${companyname}`,
      template: "./updateemailforcompanyadmin", // `.hbs` extension is appended automatically
      context: {
        companyname,
      }
    });
  }
  // send email after register employee
  async sendemailtoemployeeregistration(employeeemail, companyname, employeename, employeepassword, employeeusername) {
    await this.mailerService.sendMail({
      to: employeeemail.trim(),
      from: "noreply@hexagonasia.com", // override default from
      subject: `Employee Registration ${companyname}`,
      template: "./employeeregistration", // `.hbs` extension is appended automatically
      context: {
        employeename,
        companyname,
        employeeusername,
        employeepassword,

      }
    });
  }

  //   async sendcompanyCreateNew(toemail,companyname){
  // await this.mailerService.sendMail({
  //       to: toemail.trim(),
  //       from: "noreply@hexagonasia.com", // override default from
  //       subject: `Login Credentials for BBK Application`,
  //       template: "./companyconfirmationnew", // `.hbs` extension is appended automatically
  //       context: {
  //         companyname
  //       }});
  // }
  // async senduserCreate(
  //   password: string,
  //   name: string,
  //   toemail: string,
  //   username: string
  // ) {
  //   if(password==""||username==""){
  //     await this.mailerService.sendMail({
  //       to: toemail.trim(),
  //       from: "noreply@hexagonasia.com", // override default from
  //       subject: `Login Credentials for BBK Application`,
  //       template: "./companysameadmin", // `.hbs` extension is appended automatically
  //       context: {
  //         name,
  //         username,
  //         password,
  //       },
  //     });
  //   }else{
  //     await this.mailerService.sendMail({
  //       to: toemail.trim(),
  //       from: "noreply@hexagonasia.com", // override default from
  //       subject: `Login Credentials for BBK Application`,
  //       template: "./userconfirmation", // `.hbs` extension is appended automatically
  //       context: {
  //         name,
  //         username,
  //         password,
  //       },
  //     });
  //   }

  // }



  // async sendcompanyCreate(
  //   password: string,
  //   name: string,
  //   toemail: string,
  //   username: string
  // ) {
  //   if(password==""||username==""){
  //     await this.mailerService.sendMail({
  //       to: toemail.trim(),
  //       from: "noreply@hexagonasia.com", // override default from
  //       subject: `Login Credentials for BBK Application`,
  //       template: "./companysameadmin", // `.hbs` extension is appended automatically
  //       context: {
  //         name,
  //         username,
  //         password,
  //       },
  //     });
  //   }else{
  //     await this.mailerService.sendMail({
  //       to: toemail.trim(),
  //       from: "noreply@hexagonasia.com", // override default from
  //       subject: `Login Credentials for BBK Application`,
  //       template: "./companyconfirmation", // `.hbs` extension is appended automatically
  //       context: {
  //         name,
  //         username,
  //         password,
  //       },
  //     });
  //   }

  // }

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

  // async cancelemail(data: any) {
  //   const entityManager = getManager();

  //   const emailData =
  //     await entityManager.query(`select distinct username,email from
  //   (SELECT b.userName,b.email
  //   FROM approvelog a
  //   inner join user b
  //   on  a.userId=b.id
  //   where a.companyId=3 and a.programtypeid=${data.programtypeId} and a.tranheaderId=${data.tranheaderId}
  //   union ALL
  //   SELECT b.userName,b.email
  //   FROM approvelog a
  //   inner join user b
  //   on  a.approverId=b.id
  //   where a.companyId= ${data.companyId} and a.programtypeid=${data.programtypeId} and a.tranheaderId=${data.tranheaderId}) x`);

  //   let emailString = null;

  //   for (const email of emailData) {
  //     if (emailString) {
  //       emailString = emailString + "," + email.email;
  //     } else {
  //       emailString = email.email;
  //     }
  //   }

  //   await this.mailerService.sendMail({
  //     to: emailString,
  //     //cc:emailData[0] ? emailData[0].emailadd : '',
  //     subject: `You ${data.programtype.typedes} has bean ${data.status} by ${data.approver.userName}`,
  //     template: "/templates/cancel", // `.hbs` extension is appended automatically
  //     context: {
  //       name: data.user.userName,
  //       text: `You ${data.programtype.typedes} has bean ${data.status} by ${data.approver.userName} for following reasons`,
  //       msg: data.msg,
  //       supName: data.supName,
  //       num: data.approvelog.num,
  //       date: data.approvelog.podate,
  //     },
  //   });
  // }

  // async sendDapp(email: string, obj: any, atype: string) {
  //   await this.mailerService.sendMail({
  //     to: email,
  //     from: "noreply@hexagonasia.com", // override default from
  //     subject: `Travel Information`,
  //     template: "/templates/dapp", // `.hbs` extension is appended automatically
  //     context: {
  //       obj,
  //       atype,
  //     },
  //   });
  // }

  // async sendSample(link: string, caption: string) {
  //   await this.mailerService.sendMail({
  //     to: "thushara@earthfoam.com , trevin@earthfoam.com",
  //     from: "noreply@hexagonasia.com", // override default from
  //     subject: caption,
  //     template: "/templates/sample", // `.hbs` extension is appended automatically
  //     context: {
  //       link,
  //     },
  //   });
  // }

  // async sendCron(link: string, link2: string, link3: string) {
  //   this.mailerService.sendMail({
  //     to: "januka@earthfoam.com,thushara@earthfoam.com,operation.lk@earthfoam.com,trevin@earthfoam.com,windana@earthfoam.com,eng.lk@earthfoam.com,ap.lk@earthfoam.com,production.lk@earthfoam.com,quality.lk@earthfoam.com,fabrication.lk@earthfoam.com,compound.lk@earthfoam.com,planning.lk@earthfoam.com,ar.lk@earthfoam.com,sahan@earthfoam.com,engop.lk@earthfoam.com",
  //     from: "noreply@hexagonasia.com", // override default from
  //     subject: "Production Summary , Energy and Fabrication Wastage report",
  //     template: "/templates/cron", // `.hbs` extension is appended automatically
  //     attachments: [
  //       {
  //         filename: "production_summary.pdf",
  //         path: link,
  //       },
  //       {
  //         filename: "energy_summary.pdf",
  //         path: link2,
  //       },
  //       {
  //         filename: "fabrication_waste.pdf",
  //         path: link3,
  //       },
  //     ],
  //     context: {},
  //   });
  // }

  // async sendCron2(link: string) {
  //   this.mailerService.sendMail({
  //     to: "januka@earthfoam.com,thushara@earthfoam.com,operation.lk@earthfoam.com,trevin@earthfoam.com,windana@earthfoam.com,eng.lk@earthfoam.com,ap.lk@earthfoam.com,production.lk@earthfoam.com,quality.lk@earthfoam.com,fabrication.lk@earthfoam.com,compound.lk@earthfoam.com,planning.lk@earthfoam.com,ar.lk@earthfoam.com,sahan@earthfoam.com,engop.lk@earthfoam.com",
  //     from: "noreply@hexagonasia.com", // override default from
  //     subject: "Wip Stock report",
  //     template: "/templates/cron2", // `.hbs` extension is appended automatically
  //     attachments: [
  //       {
  //         filename: "wip_stock.pdf",
  //         path: link,
  //       },
  //     ],
  //     context: {},
  //   });
  // }

  // async sendCron3(link: string) {
  //   this.mailerService.sendMail({
  //     to: "januka@earthfoam.com,thushara@earthfoam.com,operation.lk@earthfoam.com,trevin@earthfoam.com,windana@earthfoam.com,eng.lk@earthfoam.com,ap.lk@earthfoam.com,production.lk@earthfoam.com,quality.lk@earthfoam.com,fabrication.lk@earthfoam.com,compound.lk@earthfoam.com,planning.lk@earthfoam.com,ar.lk@earthfoam.com,sahan@earthfoam.com,engop.lk@earthfoam.com",
  //     from: "noreply@hexagonasia.com", // override default from
  //     subject: "Wip Stock report",
  //     template: "/templates/cron3", // `.hbs` extension is appended automatically
  //     attachments: [
  //       {
  //         filename: "wip_stock.pdf",
  //         path: link,
  //       },
  //     ],
  //     context: {},
  //   });
  // }

  // async crontest(link: string) {
  //   this.mailerService.sendMail({
  //     to: "itranga@gmail.com",
  //     from: "noreply@hexagonasia.com", 
  //     subject: "Wip Stock report",
  //     template: "/templates/test", 
  //     attachments: [
  //       {
  //         filename: "wip_stock.pdf",
  //         path: link,
  //       },
  //     ],
  //   });
  // }


  // async xlsx(link: string , data:any) {
  //   this.mailerService.sendMail({
  //     to: "kshevick@earthfoam.com,ezra.shevick@shevicksales.com,rmaziarz@shevicksales.com",
  //     bcc:"trevin@earthfoam.com",
  //     from: "noreply@hexagonasia.com", 
  //     subject: data.ordernum,
  //     template: "/templates/approval", 
  //     context: {
  //       ordernum : data.ordernum
  //     },
  //     attachments: [
  //       {
  //         filename: "dispatch-approval.xlsx",
  //         path: link,
  //       },
  //     ],
  //   });
  // }  
}

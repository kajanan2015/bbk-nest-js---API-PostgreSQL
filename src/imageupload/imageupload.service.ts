import { S3 } from "aws-sdk";
import { Logger, Injectable } from "@nestjs/common";
import {
  getConnection,
  QueryRunner,
  Connection,
  Between,
  In,
  getManager,
} from "typeorm";
import sharp = require("sharp");
import fetch from 'node-fetch';

@Injectable()
export class ImageUploadService {
  constructor(private connection: Connection) {}




  
  async uploadS3Add(file, bucket, name) {
    const s3 = this.getS3();

    const params = {
      Bucket: bucket,
      Key: String(Date.now().toString()+"_"+name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, async (err, data) => {
        if (err) {

          console.log(err , 888);

          Logger.error(err);
          reject(err.message);
        }

        

        resolve(data.Location);
      });
    });
  }
async deletedoc(data){
   const s3 = this.getS3();
   // Extract the object key from the document URL
   const objectKey = data.split('/').pop();

   // Create the delete object parameters
   const params = {
     Bucket: 'intaap',
     Key: objectKey,
   };
 console.log(params,232323)
   // Call the deleteObject method to delete the file
   await s3.deleteObject(params).promise();
}
  

  async uploadmobiledefect(files, name) {
    const bucketS3 = "intaap/mobile";

    let fileInfo = [];

    for (const file of files) {
      let obj = await this.uploadS3Add(file.buffer, bucketS3, file.originalname);
      fileInfo.push(obj);
    }


   return fileInfo;
  }

  async upload(files, name) {
    const bucketS3 = "intaap";

    let fileInfo = [];

    for (const file of files) {
      let obj = await this.uploadS3Add(file.buffer, bucketS3, file.originalname);
      fileInfo.push(obj);
    }


   return fileInfo;
  }

  async uploadmobile(files, name) {
    const bucketS3 = "intaap/mobile";

    let fileInfo = [];

    for (const file of files) {
      let obj = await this.uploadS3Add(file.buffer, bucketS3, file.originalname);
      let fieldName = file.fieldname;
      let existingObj = fileInfo.find((f) => f[fieldName]);
        if (existingObj) {
          existingObj[fieldName].push(obj);
        } else {
          const newObj = { [fieldName]: [obj] };
          fileInfo.push(newObj);
        }
        }
   return fileInfo;
  }



  async uploadcompany(files, name) {
    const bucketS3 = "intaap";

    let fileInfo = [];

    for (const file of files) {
      let obj = await this.uploadS3Add(file.buffer, bucketS3, file.originalname);
      let fieldName = file.fieldname;
      let existingObj = fileInfo.find((f) => f[fieldName]);
        if (existingObj) {
          existingObj[fieldName].push(obj);
        } else {
          const newObj = { [fieldName]: [obj] };
          fileInfo.push(newObj);
        }
        }

console.log(fileInfo,99999)
   return fileInfo;
  }



  async uploadoiikii(files, name) {
    const bucketS3 = "oiikii";

    let fileInfo = [];

    for (const file of files) {
      let obj = await this.uploadS3Add(file.buffer, bucketS3, file.originalname);
      fileInfo.push(obj);
    }


   return fileInfo;
  }


  async uploadimage(body) {
    const bucketS3 = "intaap";

    const obj = await this.uploadS3(body.image, bucketS3, body.name );

    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    let obj1 = {
      listingsId: body.idm,
      imgname:`https://kasimages.s3.us-west-1.amazonaws.com/${body.name}` ,
     
    };

    // await queryRunner.manager.save(ListingsimagesEntity, obj1);
    // await queryRunner.commitTransaction();
    // await queryRunner.release();






    return obj;
  }







  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();

    const params = {
      Bucket: bucket,
      CopySource: file,
      Key:  name,
    };
    return new Promise((resolve, reject) => {
      s3.copyObject(params, async (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }


        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: "AKIAVIKV23CPLOFSUEEG",
      secretAccessKey: "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",
    });
  }

  async  uploadThumbnailToS3(imageUrl){
    console.log(imageUrl,9090)
    const s3 = this.getS3();
    const image = await sharp(await fetch(imageUrl).then(res => res.buffer()));
    const thumbnail = await image.resize({ width: 200, height: 200, fit: 'fill' }).toBuffer();
    const objectKey = imageUrl.split('/').pop();
    const uploadParams = {
      Bucket: 'intaap/thumb',
      Key: objectKey,
      Body: thumbnail,
    };
    const { Location } = await s3.upload(uploadParams).promise();
    console.log(Location,9090)
    return Location;
  }
  
}
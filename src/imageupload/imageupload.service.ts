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

@Injectable()
export class ImageUploadService {
  constructor(private connection: Connection) {}


  async uploadS3Add(file, bucket, name) {
    const s3 = this.getS3();

    const params = {
      Bucket: bucket,
      Key: String(name),
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

  async upload(file, name) {
    const bucketS3 = "intaap";

    const obj = await this.uploadS3Add(file.buffer, bucketS3, name.lname );

    // const connection: Connection = getConnection();
    // const queryRunner: QueryRunner = connection.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // let obj1 = {
    //   listingsId: name.idm,
    //   imgname:String(obj) ,
     
    // };

    // await queryRunner.manager.save(ListingsimagesEntity, obj1);
    // await queryRunner.commitTransaction();
    // await queryRunner.release();






    return obj;
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
}
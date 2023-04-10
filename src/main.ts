import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // var whitelist = ['http://localhost:3000/' , 'http://13.57.145.210:3001/' , 'https://www.kidsactivitiesaustralia.com.au/'];


  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //      // console.log("allowed cors for:", origin)
  //       callback(null, true)
  //     } else {
  //       console.log("blocked cors for:", origin)
  //       //callback(new Error('Not allowed by CORS'))
  //       callback(null, true)
  //     }
  //   }
  // });

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"});
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  //app.use(helmet());

  await app.listen(3001);
}
bootstrap();

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IpAddressMiddleware implements NestMiddleware {
  static getRequest(): Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
  }
  use(req: Request, res: Response, next: Function) {
    req.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
  }
}

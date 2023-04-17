import {
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    Controller,
  } from "@nestjs/common";
  
  import { FileInterceptor } from "@nestjs/platform-express";
  
  import { ImageUploadService } from "./imageupload.service";
  
  @Controller("fileupload")
  export class ImageUploadController {
    constructor(private readonly imageUploadService: ImageUploadService) {}
  
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async upload(@UploadedFile() file , @Body() body) {
      return await this.imageUploadService.upload(file , body);
    }
  
  
    @Post("uploadimage")
    async uploadimage(@Body() body) {
      return await this.imageUploadService.uploadimage(body);
    }
  
  
    
  }
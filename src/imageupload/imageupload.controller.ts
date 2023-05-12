import {
    Post,
    UseInterceptors,
    UploadedFiles,
    Body,
    Controller,
  } from "@nestjs/common";
  
  import { AnyFilesInterceptor } from "@nestjs/platform-express";
  
  import { ImageUploadService } from "./imageupload.service";
  
  @Controller("fileupload")
  export class ImageUploadController {
    constructor(private readonly imageUploadService: ImageUploadService) {}
  
    @Post("upload")
    @UseInterceptors(AnyFilesInterceptor())
    async upload(@UploadedFiles() file , @Body() body) {
      return await this.imageUploadService.upload(file , body);
    }
  
  
    @Post("uploadimage")
    async uploadimage(@Body() body) {
      return await this.imageUploadService.uploadimage(body);
    }
  
  @Post('deletedoc')
  async deleteDoc(@Body() body){
      return await this.imageUploadService.deletedoc(body)
  }
    
  }
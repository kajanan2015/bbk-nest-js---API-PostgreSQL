import { Controller, HttpStatus,Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';
import { UpdateMobileAccidentImageDto } from './update-mobile-accident-image.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
@Controller('mobile-bodymark')
export class MobileAccidentImageController {
  constructor(private readonly mobileAccidentImageService: MobileAccidentImageService, private   readonly imageUploadService: ImageUploadService,) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file ,@Body() createMobileAccidentImageDto:CreateMobileAccidentImageDto) {
    const filename=await this.imageUploadService.upload(file , "body");
    const data={
      ...createMobileAccidentImageDto,
      "patheImage":filename
    }
     const mobileaccident=await this.mobileAccidentImageService.create(data);
     return {
      statusCode: HttpStatus.OK,
      // mobileaccident
    };
    }
    
    @Post("upload")
    @UseInterceptors(AnyFilesInterceptor())
    async upload(@UploadedFiles() file , @Body() body) {
      const response=await this.imageUploadService.upload(file , body);
      console.log(response,89898)
      return await this.imageUploadService.upload(file , body);
    }
  @Get()
  async findAll() {
    return await this.mobileAccidentImageService.findAll();
  }


  @Get('/findbytrip/:id')
  async findbyTrip(@Param('id') id: string) {
    return await this.mobileAccidentImageService.findBytripOne(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mobileAccidentImageService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMobileAccidentImageDto: UpdateMobileAccidentImageDto) {
    await this.mobileAccidentImageService.update(+id, updateMobileAccidentImageDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'accident image updated successfully',
    };
  }

  @Delete(':id')
 async remove(@Param('id') id: string, @Body() body) {
    return await this.mobileAccidentImageService.remove(+id, body);
  }
}

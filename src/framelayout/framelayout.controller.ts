import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { FramelayoutService } from './framelayout.service';
import { CreateFramelayoutDto } from './create-framelayout.dto';
import { UpdateFramelayoutDto } from './update-framelayout.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@Controller('framelayout')
export class FramelayoutController {
  constructor(private readonly service: FramelayoutService, private imageUploadService: ImageUploadService) {}
  @Get()
  async showAll() {
    const permissions = await this.service.showAll();
    return {
      statusCode: HttpStatus.OK,
      permissions
    };
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() walkarroundcheckvtypeDTO: CreateFramelayoutDto) {

    const filename = await this.imageUploadService.uploadoiikii(file, "body");
    const dataSave = {
      ...walkarroundcheckvtypeDTO,
      "vimage": filename
    }
    await this.service.create(dataSave);
    return {
      statusCode: HttpStatus.OK,
    };



  }

  @Get('/vtype/:type')
  async read(@Param('type') type: string) {
    const permissions = await this.service.read(type);
    return {
      statusCode: HttpStatus.OK,
      permissions,
    };
  }

  @Put('/edit/:id')
  async uppdate(@Param('id') id: number, @Body() data: Partial<CreateFramelayoutDto>) {

    await this.service.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Permission updated successfully',
    };
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.destroy(+id);
  }
}

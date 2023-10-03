import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { walkarroundcheckvtypeDTO } from './walkarroundcheckvtype.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { walkarroundcheckvtypeService } from './walkarroundcheckvtype.service';
import { ImageUploadService } from 'src/imageupload/imageupload.service';


@Controller('walkarroundcheckvtype')
export class walkarroundcheckvtypeController {
  constructor(private service: walkarroundcheckvtypeService, private imageUploadService: ImageUploadService) { }

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
  async create(@UploadedFiles() file, @Body() walkarroundcheckvtypeDTO: walkarroundcheckvtypeDTO) {

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
  async uppdate(@Param('id') id: number, @Body() data: Partial<walkarroundcheckvtypeDTO>) {

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
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AccidentUploadService } from './accident-upload.service';
import { CreateAccidentUploadDto } from './create-accident-upload.dto';
import { UpdateAccidentUploadDto } from './update-accident-upload.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@Controller('accident-upload')
export class AccidentUploadController {
  constructor(private readonly accidentUploadService: AccidentUploadService,
    private readonly imageUploadService: ImageUploadService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file,@Body() accidentData) {
    console.log(file)
    console.log(accidentData,78787)
    const filename = await this.imageUploadService.uploadmobile(file, "body");
    console.log(filename,8787878)
    const data = {
      ...accidentData,
      "filename": filename
    }
    console.log(data,202233)
    return this.accidentUploadService.create(data);
  }

  @Get()
  findAll() {
    return this.accidentUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentUploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccidentUploadDto: UpdateAccidentUploadDto) {
    return this.accidentUploadService.update(+id, updateAccidentUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentUploadService.remove(+id);
  }
}

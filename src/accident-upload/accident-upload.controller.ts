import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { AccidentUploadService } from './accident-upload.service';
import { CreateAccidentUploadDto } from './create-accident-upload.dto';
import { UpdateAccidentUploadDto } from './update-accident-upload.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('accident-upload')
export class AccidentUploadController {
  constructor(private readonly accidentUploadService: AccidentUploadService,
    private readonly imageUploadService: ImageUploadService) { }


  // upload accident details
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() accidentData) {

    const filename = await this.imageUploadService.uploadmobile(file, "body");

    const data = {
      ...accidentData,
      "filename": filename
    }

    return this.accidentUploadService.create(data);
  }
// find all accident details
  @Get()
  findAll() {
    return this.accidentUploadService.findAll();
  }
// find by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentUploadService.findOne(+id);
  }
// find by trip id
  @Get('/findOneByTrip/:id')
  findOneByTrip(@Param('id') id: string) {
    return this.accidentUploadService.findOneByTrip(+id);
  }
// update accident
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccidentUploadDto: UpdateAccidentUploadDto) {
    return this.accidentUploadService.update(+id, updateAccidentUploadDto);
  }
// delete accident
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentUploadService.remove(+id);
  }
}

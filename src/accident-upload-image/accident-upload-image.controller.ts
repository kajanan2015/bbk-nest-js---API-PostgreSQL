import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccidentUploadImageService } from './accident-upload-image.service';
import { CreateAccidentUploadImageDto } from './create-accident-upload-image.dto';
import { UpdateAccidentUploadImageDto } from './update-accident-upload-image.dto';

@Controller('accident-upload-image')
export class AccidentUploadImageController {
  constructor(private readonly accidentUploadImageService: AccidentUploadImageService) {}

  @Post()
  create(@Body() createAccidentUploadImageDto: CreateAccidentUploadImageDto) {
    return this.accidentUploadImageService.create(createAccidentUploadImageDto);
  }

  @Get()
  findAll() {
    return this.accidentUploadImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentUploadImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccidentUploadImageDto: UpdateAccidentUploadImageDto) {
    return this.accidentUploadImageService.update(+id, updateAccidentUploadImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentUploadImageService.remove(+id);
  }
}

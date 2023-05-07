import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccidentUploadService } from './accident-upload.service';
import { CreateAccidentUploadDto } from './create-accident-upload.dto';
import { UpdateAccidentUploadDto } from './update-accident-upload.dto';

@Controller('accident-upload')
export class AccidentUploadController {
  constructor(private readonly accidentUploadService: AccidentUploadService) {}

  @Post()
  create(@Body() createAccidentUploadDto: CreateAccidentUploadDto) {
    return this.accidentUploadService.create(createAccidentUploadDto);
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

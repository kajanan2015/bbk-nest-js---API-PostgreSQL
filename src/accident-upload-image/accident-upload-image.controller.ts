import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccidentUploadImageService } from './accident-upload-image.service';
import { CreateAccidentUploadImageDto } from './create-accident-upload-image.dto';
import { UpdateAccidentUploadImageDto } from './update-accident-upload-image.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('accident-upload-image')
export class AccidentUploadImageController {
  constructor(private readonly accidentUploadImageService: AccidentUploadImageService) {}
// upload image
  @Post()
  create(@Body() createAccidentUploadImageDto: CreateAccidentUploadImageDto) {
    return this.accidentUploadImageService.create(createAccidentUploadImageDto);
  }
// find all image
  @Get()
  findAll() {
    return this.accidentUploadImageService.findAll();
  }
// get image by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentUploadImageService.findOne(+id);
  }
// update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccidentUploadImageDto: UpdateAccidentUploadImageDto) {
    return this.accidentUploadImageService.update(+id, updateAccidentUploadImageDto);
  }
// delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentUploadImageService.remove(+id);
  }
}

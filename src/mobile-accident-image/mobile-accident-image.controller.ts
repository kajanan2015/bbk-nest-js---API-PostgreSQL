import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';
import { UpdateMobileAccidentImageDto } from './update-mobile-accident-image.dto';

@Controller('mobile-accident-image')
export class MobileAccidentImageController {
  constructor(private readonly mobileAccidentImageService: MobileAccidentImageService) {}

  @Post()
  create(@Body() createMobileAccidentImageDto: CreateMobileAccidentImageDto) {
    return this.mobileAccidentImageService.create(createMobileAccidentImageDto);
  }

  @Get()
  findAll() {
    return this.mobileAccidentImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobileAccidentImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobileAccidentImageDto: UpdateMobileAccidentImageDto) {
    return this.mobileAccidentImageService.update(+id, updateMobileAccidentImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileAccidentImageService.remove(+id);
  }
}

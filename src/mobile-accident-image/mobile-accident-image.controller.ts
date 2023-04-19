import { Controller, HttpStatus,Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';
import { UpdateMobileAccidentImageDto } from './update-mobile-accident-image.dto';

@Controller('mobile-accident-image')
export class MobileAccidentImageController {
  constructor(private readonly mobileAccidentImageService: MobileAccidentImageService) {}

  @Post()
  async create(@Body() createMobileAccidentImageDto: CreateMobileAccidentImageDto) {
     const mobileaccident=await this.mobileAccidentImageService.create(createMobileAccidentImageDto);
     return {
      statusCode: HttpStatus.OK,
      mobileaccident
    };
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
  async update(@Param('id') id: string, @Body() updateMobileAccidentImageDto: UpdateMobileAccidentImageDto) {
    await this.mobileAccidentImageService.update(+id, updateMobileAccidentImageDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Company updated successfully',
    };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mobileAccidentImageService.remove(+id);
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccidentUploadThirdPartyService } from './accident-upload-third-party.service';
import { CreateAccidentUploadThirdPartyDto } from './create-accident-upload-third-party.dto';
import { UpdateAccidentUploadThirdPartyDto } from './update-accident-upload-third-party.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('accident-upload-third-party')
export class AccidentUploadThirdPartyController {
  constructor(private readonly accidentUploadThirdPartyService: AccidentUploadThirdPartyService) {}
// third party involvement create
  @Post()
  create(@Body() createAccidentUploadThirdPartyDto: CreateAccidentUploadThirdPartyDto) {
    return this.accidentUploadThirdPartyService.create(createAccidentUploadThirdPartyDto);
  }
// get all third party involvement
  @Get()
  findAll() {
    return this.accidentUploadThirdPartyService.findAll();
  }
// get one by one third party
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentUploadThirdPartyService.findOne(+id);
  }
// update third party involvement
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccidentUploadThirdPartyDto: UpdateAccidentUploadThirdPartyDto) {
    return this.accidentUploadThirdPartyService.update(+id, updateAccidentUploadThirdPartyDto);
  }
// delete third party involvement
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentUploadThirdPartyService.remove(+id);
  }
}

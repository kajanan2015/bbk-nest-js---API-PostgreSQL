import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemCodeService } from './system-code.service';
import { CreateSystemCodeDto } from './create-system-code.dto';
import { UpdateSystemCodeDto } from './update-system-code.dto';

@Controller('system-code')
export class SystemCodeController {
  constructor(private readonly systemCodeService: SystemCodeService) {}

  @Post()
  create(@Body() createSystemCodeDto: CreateSystemCodeDto) {
    return this.systemCodeService.create(createSystemCodeDto);
  }

  @Get()
  findAll() {
    return this.systemCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') purpose: string) {
    return this.systemCodeService.findOne(purpose);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemCodeDto: UpdateSystemCodeDto) {
    return this.systemCodeService.update(+id, updateSystemCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemCodeService.remove(+id);
  }
}

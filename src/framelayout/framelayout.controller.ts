import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FramelayoutService } from './framelayout.service';
import { CreateFramelayoutDto } from './create-framelayout.dto';
import { UpdateFramelayoutDto } from './update-framelayout.dto';

@Controller('framelayout')
export class FramelayoutController {
  constructor(private readonly framelayoutService: FramelayoutService) {}

  @Post()
  create(@Body() createFramelayoutDto: CreateFramelayoutDto) {
    return this.framelayoutService.create(createFramelayoutDto);
  }

  @Get()
  findAll() {
    return this.framelayoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.framelayoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFramelayoutDto: UpdateFramelayoutDto) {
    return this.framelayoutService.update(+id, updateFramelayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.framelayoutService.remove(+id);
  }
}

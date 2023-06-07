import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ModuledetailsofpackageService } from './moduledetailsofpackage.service';
import { CreateModuledetailsofpackageDto } from './create-moduledetailsofpackage.dto';
import { UpdateModuledetailsofpackageDto } from './update-moduledetailsofpackage.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('moduledetailsofpackage')
export class ModuledetailsofpackageController {
  constructor(private readonly moduledetailsofpackageService: ModuledetailsofpackageService) {}

  @Post()
  create(@Body() createModuledetailsofpackageDto: CreateModuledetailsofpackageDto) {
    return this.moduledetailsofpackageService.create(createModuledetailsofpackageDto);
  }

  @Get()
  findAll() {
    return this.moduledetailsofpackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduledetailsofpackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuledetailsofpackageDto: UpdateModuledetailsofpackageDto) {
    return this.moduledetailsofpackageService.update(+id, updateModuledetailsofpackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduledetailsofpackageService.remove(+id);
  }
}

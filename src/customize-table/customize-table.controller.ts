import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomizeTableService } from './customize-table.service';
import { CreateCustomizeTableDto } from './create-customize-table.dto';
import { UpdateCustomizeTableDto } from './update-customize-table.dto';

@Controller('customize-table')
export class CustomizeTableController {
  constructor(private readonly customizeTableService: CustomizeTableService) {}

  @Post()
  create(@Body() createCustomizeTableDto: CreateCustomizeTableDto) {
    return this.customizeTableService.create(createCustomizeTableDto);
  }

  @Post('/getUserTableModel')
  findOne(@Body() createCustomizeTableDto: CreateCustomizeTableDto) {
    return this.customizeTableService.getUserTableModel(createCustomizeTableDto);
  }

  @Get()
  findAll() {
    return this.customizeTableService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.customizeTableService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomizeTableDto: UpdateCustomizeTableDto) {
    return this.customizeTableService.update(+id, updateCustomizeTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customizeTableService.remove(+id);
  }
}

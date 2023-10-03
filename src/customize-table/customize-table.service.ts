import { Injectable } from '@nestjs/common';
import { CreateCustomizeTableDto } from './create-customize-table.dto';
import { UpdateCustomizeTableDto } from './update-customize-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomizeTable } from './customize-table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomizeTableService {
  constructor(
    @InjectRepository(CustomizeTable)
    private customizeTableRepository: Repository<CustomizeTable>,
  ) { }
  async create(createCustomizeTableDto) {
    const existingrecord = await this.customizeTableRepository.findOne({ where: { user: createCustomizeTableDto.user, tableId: createCustomizeTableDto.tableId, company: createCustomizeTableDto.company } });
    if (existingrecord) {
      const data = {
        ...createCustomizeTableDto
      }
      const response = await this.customizeTableRepository.update({ id: existingrecord.id }, data);
      return await this.customizeTableRepository.findOne({ id: existingrecord.id });
    } else {
      const response = this.customizeTableRepository.create(createCustomizeTableDto);
      return await this.customizeTableRepository.save(response);
    }
  }

  async findAll() {
    return await this.customizeTableRepository.find();
  }

  async getUserTableModel(createCustomizeTableDto) {
    console.log(createCustomizeTableDto)
    return await this.customizeTableRepository.find({ where: { user: createCustomizeTableDto.user, tableId: createCustomizeTableDto.tableId, company: createCustomizeTableDto.company }});
  }

  async findOne(id: number) {
    return await this.customizeTableRepository.find();
  }

  update(id: number, updateCustomizeTableDto: UpdateCustomizeTableDto) {
    return `This action updates a #${id} customizeTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} customizeTable`;
  }
}

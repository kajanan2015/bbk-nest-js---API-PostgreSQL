import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
import { pagepermissionDTO } from './pagepermission.dto';
import { pagepermissionEntity } from './pagepermission.entity';

    @Injectable()
    export class pagepermissionService {
      constructor(
        @InjectRepository(pagepermissionEntity)
        private pagepermissionRepository: Repository<pagepermissionEntity>,
      ) {}

      async showAll() {
        return await this.pagepermissionRepository.find(
          { where: { status: 1 } }
        );
      }

      async create(data: pagepermissionDTO) {
        const company = this.pagepermissionRepository.create(data);
        await this.pagepermissionRepository.save(data);
        return company;
      }

      async findById(id: number): Promise<pagepermissionDTO> {
        return await this.pagepermissionRepository.findOne({ id });
      }

      async findByName(formname: string): Promise<pagepermissionEntity> {
        const company = await this.pagepermissionRepository.findOne({ formname });
        if (!company) {
          throw new NotFoundException(`Company with name '${formname}' not found`);
        }
        return company;
      }
      
      async read(id: number) {
        return await this.pagepermissionRepository.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<pagepermissionEntity>) {
        await this.pagepermissionRepository.update({ id }, data);
        return await this.pagepermissionRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.pagepermissionRepository.delete({ id });
        return { deleted: true };
      }
    
    }
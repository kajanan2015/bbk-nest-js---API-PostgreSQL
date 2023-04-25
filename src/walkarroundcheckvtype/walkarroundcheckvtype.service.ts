import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
import { walkarroundcheckvtypeDTO } from './walkarroundcheckvtype.dto';
import { walkarroundcheckvtypeEntity } from './walkarroundcheckvtype.entity';

    @Injectable()
    export class walkarroundcheckvtypeService {
      constructor(
        @InjectRepository(walkarroundcheckvtypeEntity)
        private walkarroundcheckvtypeRepository: Repository<walkarroundcheckvtypeEntity>,
      ) {}

      async showAll() {
        return await this.walkarroundcheckvtypeRepository.find();
      }

      async create(data) {
        const company = this.walkarroundcheckvtypeRepository.create(data);
        await this.walkarroundcheckvtypeRepository.save(data);
        return company;
      }

      async findById(id: number): Promise<walkarroundcheckvtypeDTO> {
        return await this.walkarroundcheckvtypeRepository.findOne({ id });
      }

      
      
      async read(type: string) {
        return await this.walkarroundcheckvtypeRepository.findOne({ where: { vtype: type } });
      }

      async update(id: number, data: Partial<walkarroundcheckvtypeEntity>) {
        await this.walkarroundcheckvtypeRepository.update({ id }, data);
        return await this.walkarroundcheckvtypeRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.walkarroundcheckvtypeRepository.delete({ id });
        return { deleted: true };
      }
    
    }
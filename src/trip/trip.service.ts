import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
import { TripDTO } from './trip.dto';
import { TripEntity } from './trip.entity';

    @Injectable()
    export class TripService {
      constructor(
        @InjectRepository(TripEntity)
        private companyRepository: Repository<TripEntity>,
      ) {}

      async showAll() {
        return await this.companyRepository.find();
      }

      async create(data: TripDTO) {
        const company = this.companyRepository.create(data);
        await this.companyRepository.save(data);
        return company;
      }

      async findById(id: number): Promise<TripDTO> {
        return await this.companyRepository.findOne({ id });
      }

      async findByName(name: string): Promise<TripEntity> {
        const company = await this.companyRepository.findOne({ name });
        if (!company) {
          throw new NotFoundException(`Company with name '${name}' not found`);
        }
        return company;
      }
      
      async read(id: number) {
        return await this.companyRepository.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<TripDTO>) {
        await this.companyRepository.update({ id }, data);
        return await this.companyRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.companyRepository.delete({ id });
        return { deleted: true };
      }
    
    }
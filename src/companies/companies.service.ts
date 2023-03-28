import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';

    import { CompaniesEntity } from './entity/companies.entity';
    import { CompaniesDTO } from './dto/companies.dto';

    @Injectable()
    export class CompaniesService {
      constructor(
        @InjectRepository(CompaniesEntity)
        private companyRepository: Repository<CompaniesEntity>,
      ) {}

      async showAll() {
        return await this.companyRepository.find();
      }

      async create(data: CompaniesDTO) {
        const company = this.companyRepository.create(data);
        await this.companyRepository.save(data);
        return company;
      }

      async findByEmail(email: string): Promise<CompaniesDTO> {
        return await this.companyRepository.findOne({
          where: {
            email: email,
          },
        });
      }

      async findByName(name: string): Promise<CompaniesEntity> {
        const company = await this.companyRepository.findOne({ name });
        if (!company) {
          throw new NotFoundException(`Company with name '${name}' not found`);
        }
        return company;
      }
      
      async read(id: number) {
        return await this.companyRepository.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<CompaniesDTO>) {
        await this.companyRepository.update({ id }, data);
        return await this.companyRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.companyRepository.delete({ id });
        return { deleted: true };
      }
    
    }
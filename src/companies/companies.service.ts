import { Injectable, HttpStatus } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';

    import { CompaniesEntity } from './companies.entity';
    import { CompaniesDTO } from './companies.dto';

    @Injectable()
    export class CompaniesService {
      constructor(
        @InjectRepository(CompaniesEntity)
        private usersRepository: Repository<CompaniesEntity>,
      ) {}

      async showAll() {
        return await this.usersRepository.find();
      }

      async create(data: CompaniesDTO) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
      }

      async findByEmail(email: string): Promise<CompaniesDTO> {
        return await this.usersRepository.findOne({
          where: {
            email: email,
          },
        });
      }

      async read(id: number) {
        return await this.usersRepository.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<CompaniesDTO>) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
      }
    }
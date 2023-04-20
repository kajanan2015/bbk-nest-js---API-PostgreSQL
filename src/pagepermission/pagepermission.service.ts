import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pagepermissionDTO } from './pagepermission.dto';
import { PagePermissionEntity } from './pagepermission.entity';

@Injectable()
export class PagePermissionService {
  constructor(
    @InjectRepository(PagePermissionEntity)
    private pagepermissionRepository: Repository<PagePermissionEntity>,
  ) { }

  async showAll() {
    return await this.pagepermissionRepository.find(
      {
        where: { pageStatus: 1 },
        relations: ['parentPage']
      }
    );
  }

  async showParentPage(pageTypeId: number): Promise<PagePermissionEntity[]> {
    return await this.pagepermissionRepository.find(
      {
        where: { pageStatus: 1 , pageType: pageTypeId - 1 },
        relations: ['parentPage']
      }
    );
  }

  async create(pageData: PagePermissionEntity): Promise<PagePermissionEntity> {
    const page = this.pagepermissionRepository.create(pageData);
    return await this.pagepermissionRepository.save(page);
  }

  async read(id: number) {
    return await this.pagepermissionRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<PagePermissionEntity>) {
    await this.pagepermissionRepository.update({ id }, data);
    return await this.pagepermissionRepository.findOne({ id });
  }

}
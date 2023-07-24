import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDocumentDto } from './create-company-document.dto';
import { UpdateCompanyDocumentDto } from './update-company-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDocument } from './company-document.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CompanyDocumentService {
  constructor(
    @InjectRepository(CompanyDocument)
    private companyDocumentRepository: Repository<CompanyDocument>
  ) { }
  async create(documentData) {
    const response = this.companyDocumentRepository.create(documentData);
    return await this.companyDocumentRepository.save(response);
  }

  async findAll() {
    return await this.companyDocumentRepository.find();
  }

  async findOne(companyDocId: number) {
    const doc = await this.companyDocumentRepository.find({
      where: { companyDoc: companyDocId }
    });

    return doc;
  }

  async update(id: number, updatecompanydocDto: UpdateCompanyDocumentDto) {
    await this.companyDocumentRepository.update({ id }, updatecompanydocDto);
    return await this.companyDocumentRepository.findOne({ id });
  }
  remove(id: number) {
    return `This action removes a #${id} defectCase`;
  }
}

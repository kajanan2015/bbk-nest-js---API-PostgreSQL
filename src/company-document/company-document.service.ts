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

  async updateStatus(documentName, newStatus) {
    try {
      const companyDocument = await this.companyDocumentRepository.find({
        where: {
          documentName: documentName,
        },
      });

      for (const companyDoc of companyDocument) {
        companyDoc.status = newStatus
      }

      await this.companyDocumentRepository.save(companyDocument);
    } catch (error) {
      throw new Error('Failed to update CompanyDocument status');
    }
  }

  async findAll() {
    return await this.companyDocumentRepository.find();
  }

  async findByCompanyId(companyId: number) {
    const doc = await this.companyDocumentRepository.find({
      where: { companyDoc: companyId, status: true }
    });

    return doc;
  }

  async findDocHistory(documentName: string) {
    const doc = await this.companyDocumentRepository.find({
      where: { documentName: documentName }
    });

    return doc;
  }

  async findByDocumentName(documentName: string): Promise<CompanyDocument> {
    return await this.companyDocumentRepository.findOne({ where: { documentName: documentName } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionManager } from 'typeorm';
// import { FirstEntity } from './entities/first.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
@Injectable()
export class HistoryTransactionservicedb {
  constructor() {} // Remove the repository injection

  // async findById(id: number): Promise<CompaniesEntity | undefined> {
  //   return this.firstEntityRepository.findOne(id);
  // }

  @Transaction()
  async updateEntityWithTransaction(entity,
    updateData,
    historyData,
    @TransactionManager() manager?: any,
  ): Promise<void> {
    try {
     
      if (!entity) {
        throw new NotFoundException('Entity not found');
      }

      // Update the entity with the new data
      const updateresponse=manager.merge(CompaniesEntity, entity, updateData); // Using merge directly on manager
      await manager.save(CompaniesEntity, updateresponse);

      const createresponse= manager.create(CompaniesHistorydata, historyData); // Using merge directly on manager
      await manager.save(CompaniesHistorydata, createresponse);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }
}

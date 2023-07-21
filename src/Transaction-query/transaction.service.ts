import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionManager } from 'typeorm';
// import { FirstEntity } from './entities/first.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
@Injectable()
export class HistoryTransactionservicedb {
  constructor() {} // Remove the repository injection

  // async findById(id: number): Promise<CompaniesEntity | undefined> {
  //   return this.firstEntityRepository.findOne(id);
  // }

  @Transaction()
  async updateEntityWithTransaction(entitydata,
    updateData,
    historyData,
    entityClass,
    historyClass,
    @TransactionManager() manager?: any,
  ): Promise<void> {
    try {
    
      // Update the entity with the new data
      const updateresponse=manager.merge(entityClass, entitydata, updateData); // Using merge directly on manager
      await manager.save(entityClass, updateresponse);
console.log('hiiiiii')
      const createresponse= manager.create(historyClass, historyData); // Using merge directly on manager
      await manager.save(historyClass, createresponse);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }


  @Transaction()
  async updateEntityWithScheduleTransaction(entitydata,
    historyData,
    entityClass,
    historyClass,
    previousentitydata,
    updatedpreviousdata,
    @TransactionManager() manager?: any,
  ): Promise<void> {
    try {
    console.log(entitydata,888)
    console.log(entitydata,888)
      // Update the entity with the new data

       // Update the entity with the new data
       const updateresponseprevious=manager.merge(entityClass, previousentitydata, updatedpreviousdata); // Using merge directly on manager
       await manager.save(entityClass, updateresponseprevious);
    
      const updateresponse=manager.create(entityClass, entitydata); // Using merge directly on manager
      await manager.save(entityClass, updateresponse);

      console.log(updateresponse['company_info_id'],99)
      historyData.companyinfo=updateresponse['company_info_id'];
      const createresponse= manager.create(historyClass, historyData); // Using merge directly on manager
      await manager.save(historyClass, createresponse);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }
}

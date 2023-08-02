import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionManager } from 'typeorm';
// import { FirstEntity } from './entities/first.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
import { Historydatatype } from 'src/companies/companies.entity';
@Injectable()
export class HistoryTransactionservicedb {
  constructor() { } // Remove the repository injection

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
      const updateresponse = await manager.merge(entityClass, entitydata, updateData); // Using merge directly on manager
      await manager.save(entityClass, updateresponse);

      const findOptions = {
        where: { companyinfo: historyData.companyinfo },
        order: {
          id: 'DESC',
        },
      }
      // Find data from another entity within the transaction
      const findresponse = await manager.findOne(historyClass, findOptions);
      const newdata = {
        updated_at: historyData.created_at,
        updated_by: historyData.created_by
      }
      const existupdate = await manager.merge(historyClass, findresponse, newdata)
      await manager.save(historyClass, existupdate);


      const createresponse = await manager.create(historyClass, historyData); // Using merge directly on manager
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
console.log(previousentitydata,6666)
console.log(updatedpreviousdata,777)
      // Update the entity with the new data
      // Update the entity with the new data
      const updateresponseprevious = manager.merge(entityClass, previousentitydata, updatedpreviousdata); // Using merge directly on manager
      await manager.save(entityClass, updateresponseprevious);

      const updateresponse = manager.create(entityClass, entitydata); // Using merge directly on manager
      await manager.save(entityClass, updateresponse);

      historyData.companyinfo = updateresponse['company_info_id'];
      const createresponse = manager.create(historyClass, historyData); // Using merge directly on manager
      await manager.save(historyClass, createresponse);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }
  @Transaction()
  async updateExistScheduleTransaction(companyinfoid, previousentitydata, historydata, entityclass, historyclass, companyExistHistory,existLastestValue,passvalue,
    @TransactionManager() manager?: any,
  ): Promise<void> {
    console.log(existLastestValue,999999)
    const newcomanyexisthistory = { ...companyExistHistory, history_data_type: Historydatatype.SCHEDULEHISTORY }
    const updateprevioushistory = manager.merge(historyclass, companyExistHistory, newcomanyexisthistory); // Using merge directly on manager
    await manager.save(historyclass, updateprevioushistory);

    const newcomanyexistdata = { ...existLastestValue, end_date:historydata.start_date,updated_by:historydata.created_by,updated_at: historydata.created_at}
    const updatepreviousexistdata = manager.merge(entityclass, existLastestValue, newcomanyexistdata); // Using merge directly on manager
    await manager.save(entityclass, updatepreviousexistdata);

    const createhistoryresponse = await manager.create(historyclass, historydata); // Using merge directly on manager
    await manager.save(historyclass, createhistoryresponse);

    const updatepreviousdata = manager.merge(entityclass, previousentitydata, passvalue); // Using merge directly on manager
    await manager.save(entityclass, updatepreviousdata);
  }
}

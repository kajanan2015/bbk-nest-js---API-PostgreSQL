import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository, Transaction, TransactionManager } from 'typeorm';
// import { FirstEntity } from './entities/first.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
import { Historydatatype } from 'src/companies/companies.entity';
import { AssignWorkPatternInfoSatatus } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
import { sub, format } from 'date-fns';
@Injectable()
export class Transactionservicedb {
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
  async updateExistScheduleTransaction(companyinfoid, previousentitydata, historydata, entityclass, historyclass, companyExistHistory, existLastestValue, passvalue,
    @TransactionManager() manager?: any,
  ): Promise<void> {
    const newcomanyexisthistory = { ...companyExistHistory, history_data_type: Historydatatype.SCHEDULEHISTORY }
    const updateprevioushistory = manager.merge(historyclass, companyExistHistory, newcomanyexisthistory); // Using merge directly on manager
    await manager.save(historyclass, updateprevioushistory);

    // const newcomanyexistdata = { ...existLastestValue, end_date:historydata.start_date,updated_by:historydata.created_by,updated_at: historydata.created_at}
    // const updatepreviousexistdata = manager.merge(entityclass, existLastestValue, newcomanyexistdata); // Using merge directly on manager
    // await manager.save(entityclass, updatepreviousexistdata);

    const createhistoryresponse = await manager.create(historyclass, historydata); // Using merge directly on manager
    await manager.save(historyclass, createhistoryresponse);

    const updatepreviousdata = manager.merge(entityclass, previousentitydata, passvalue); // Using merge directly on manager
    await manager.save(entityclass, updatepreviousdata);
  }

  @Transaction()
  async deleteExistScheduleTransaction(entity, existLastestValues, companyExistHistory, entityclass, historyclass, @TransactionManager() manager?: any,
  ): Promise<void> {
    const newcomanyexisthistory = { ...companyExistHistory, history_data_type: Historydatatype.DELETEDHISTORY }
    const updateprevioushistory = manager.merge(historyclass, companyExistHistory, newcomanyexisthistory); // Using merge directly on manager
    await manager.save(historyclass, updateprevioushistory);

    const newcomanyexistdata = { ...existLastestValues[0] }
    delete newcomanyexistdata.end_date
    delete newcomanyexistdata.updated_at
    delete newcomanyexistdata.updated_by
    newcomanyexistdata.end_date = null
    newcomanyexistdata.updated_at = null
    newcomanyexistdata.updated_by = null
    const updatepreviousexistdata = manager.merge(entityclass, existLastestValues[0], newcomanyexistdata); // Using merge directly on manager
    await manager.save(entityclass, updatepreviousexistdata);

    // const createhistoryresponse = await manager.create(historyclass, historydata); // Using merge directly on manager
    // await manager.save(historyclass, createhistoryresponse);

    // const updatepreviousdata = manager.merge(entityclass, previousentitydata, passvalue); // Using merge directly on manager
    // await manager.save(entityclass, updatepreviousdata);

    // Remove the previous entity row from the database
    const comanyexistdata = { ...entity, end_date: null, start_date: null, updated_by: null, updated_at: null }
    const newsexistdata = manager.merge(entityclass, entity, comanyexistdata); // Using merge directly on manager
    await manager.save(entityclass, newsexistdata);
    // await manager.remove(entityclass, entity);
  }


  // transaction for insert 2 years record of work pattern assign info
  @Transaction()
  async transactionforinsertworkpattern(assigninfotable, mastertable, historyTable, patterntable,
    data, masterdata, historyData, existpatterndata,startdate,availabilityfuturepattern,findcurrentdata, @TransactionManager() manager?: any,
  ) {
    try {
if(!availabilityfuturepattern){
      if (existpatterndata.length > 0) {
        for(const i of existpatterndata){
          let date=new Date();
          let previousDate = sub(startdate, {
            days: 1,
          });
          let formattedPreviousDate = format(previousDate, 'yyyy-MM-dd'); // Change the format as needed
          let allRecords = await manager.findOne(assigninfotable, {
            where: {
              assignpatternId: i.assign_id,
              assign_at:LessThanOrEqual(startdate)
            },
            order: {
              assign_at: 'ASC', // Specify 'ASC' for ascending order
            },
          });
// update status column
             await manager.update(
              assigninfotable, // Replace with your entity type
          { assign_pattern_info_id: MoreThanOrEqual(allRecords.assign_pattern_info_id),assign_at:MoreThanOrEqual(startdate),status:AssignWorkPatternInfoSatatus.ACTIVE}, // Replace with your criteria
          { status: AssignWorkPatternInfoSatatus.INACTIVE }, // Replace with the new status value
        );
        await manager.update(patterntable,{assign_id:i.assign_id},{ended_at:formattedPreviousDate,updated_at:date,updated_by:1})
        }
     
      }
    }else{
if(findcurrentdata.length>0){
  let date=new Date();
  let previousDate = sub(startdate, {
    days: 1,
  });
  let formattedPreviousDate = format(previousDate, 'yyyy-MM-dd'); // Change the format as needed
  let allRecords = await manager.findOne(assigninfotable, {
    where: {
      assignpatternId: findcurrentdata.assign_id,
      assign_at:LessThanOrEqual(startdate)
    },
    order: {
      assign_at: 'ASC', // Specify 'ASC' for ascending order
    },
  });
// update status column
     await manager.update(
      assigninfotable, // Replace with your entity type
  { assign_pattern_info_id: MoreThanOrEqual(allRecords.assign_pattern_info_id),assign_at:MoreThanOrEqual(startdate),status:AssignWorkPatternInfoSatatus.ACTIVE}, // Replace with your criteria
  { status: AssignWorkPatternInfoSatatus.INACTIVE }, // Replace with the new status value
);
await manager.update(patterntable,{assign_id:findcurrentdata.assign_id},{ended_at:formattedPreviousDate,updated_at:date,updated_by:1})

}
    }

      const createresponse = await manager.create(assigninfotable, data); // Using merge directly on manager
      await manager.save(assigninfotable, createresponse);

      const createresponsemaster = await manager.create(mastertable, masterdata); // Using merge directly on manager
      await manager.save(mastertable, createresponsemaster);

      const createResponseHistoy = await manager.create(historyTable, historyData); // Using merge directly on manager
      await manager.save(historyTable, createResponseHistoy);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically

      return 200;
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }

  // transaction for insert 2 years record of work pattern assign info
  @Transaction()
  async transactionforinsertworkpatternextend(assigninfotable, maintable,
    data, maindata, mainexistdata, @TransactionManager() manager?: any,
  ) {
    try {

      const createresponse = await manager.create(assigninfotable, data); // Using merge directly on manager
      await manager.save(assigninfotable, createresponse);

      const newsexistdata = manager.merge(maintable, mainexistdata, maindata); // Using merge directly on manager
      await manager.save(maintable, newsexistdata);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically

      return 200;
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }


  // transaction for insert 2 years record of work pattern assign info
  @Transaction()
  async transactioneditassignworkpattern(assigninfotable,existpatterndata,assign_id,data,mastertable,masterdata,historyTable,historyData,  @TransactionManager() manager?: any,
  ) {
    try {

      if (existpatterndata.length > 0) {
        for(const i of existpatterndata){
          let allRecords = await manager.findOne(assigninfotable, {
            where: {
              assignpatternId: assign_id,
            }
          });
// update status column
             await manager.update(
              assigninfotable, // Replace with your entity type
          { assign_pattern_info_id: MoreThanOrEqual(allRecords.assign_pattern_info_id),status:AssignWorkPatternInfoSatatus.ACTIVE}, // Replace with your criteria
          { status: AssignWorkPatternInfoSatatus.INACTIVE }, // Replace with the new status value
        );
        }     
      }
      
      const createresponse = await manager.create(assigninfotable, data); 
      await manager.save(assigninfotable, createresponse);

      const createresponsemaster = await manager.create(mastertable, masterdata); // Using merge directly on manager
      await manager.save(mastertable, createresponsemaster);

      const createResponseHistoy = await manager.create(historyTable, historyData); // Using merge directly on manager
      await manager.save(historyTable, createResponseHistoy);

      // You can add more business logic or other updates here

      // If everything is successful, the transaction will be committed automatically

      return 200;
    } catch (err) {
      // If any error occurs, the transaction will be rolled back automatically
      throw err; // Rethrow the error to be handled at the higher level
    }
  }


}

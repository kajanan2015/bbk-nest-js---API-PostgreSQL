import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDataHistoryDto } from './update-employee-data-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';
import { EmployeeInfo } from 'src/employee-module/employee-module.entity';

@Injectable()
export class EmployeeDataHistoryService {

  constructor(
    @InjectRepository(EmployeeDataHistory)
    private empDataHistoryRepository: Repository<EmployeeDataHistory>,
    @InjectRepository(EmployeeInfo)
    private employeeModuleRepository: Repository<EmployeeInfo>,
  ) { }

  async create(createEmployeeDataHistoryDto) {

    const response = this.empDataHistoryRepository.create(createEmployeeDataHistoryDto);

    // Find the previous record of the employee
    const previousRecord = await this.empDataHistoryRepository.findOne({
      where: {
        employeeId: +createEmployeeDataHistoryDto.employeeId,
        type: createEmployeeDataHistoryDto.type
      },
      order: { created_at: 'ASC' },
    });

    // If a previous record exists, update its endDate
    if (previousRecord) {
      previousRecord.updated_at = createEmployeeDataHistoryDto.created_at;
      previousRecord.updated_by = createEmployeeDataHistoryDto.created_by;
      await this.empDataHistoryRepository.save(previousRecord);
    }

    return await this.empDataHistoryRepository.save(response);

  }

  async findEmpDataHistory(createEmployeeDataHistoryDto) {
    const [results, totalCount] = await this.empDataHistoryRepository.findAndCount({
      where: {
        employeeId: createEmployeeDataHistoryDto.employeeId,
        type: createEmployeeDataHistoryDto.type,
        status: 1
      },
      relations: ['updated_by', 'created_by'],
      order: {
        start_date: 'DESC',
      },
      skip: createEmployeeDataHistoryDto.page * createEmployeeDataHistoryDto.pageSize,
      take: createEmployeeDataHistoryDto.pageSize,
    });

    const historyDate = results.filter(function (row) {
      return Math.floor(new Date(row.start_date).getTime() / 86400000) <= Math.floor(new Date().getTime() / 86400000)
    })

    return {
      historyList: historyDate,
      totalCount,
      totalPages: Math.ceil(totalCount / createEmployeeDataHistoryDto.pageSize),  // Calculate the total number of pages
    };
  }

  async findAllEmpDataHistory(createEmployeeDataHistoryDto) {

    // ** get all employee history
    // ** findAndCount - for future use for pagination
    const [res, totalCount] = await this.empDataHistoryRepository.findAndCount({
      where: {
        employeeId: createEmployeeDataHistoryDto.employeeId,
      },
      relations: ['updated_by', 'created_by'],
      order: {
        start_date: 'DESC',
      },
      // skip: createEmployeeDataHistoryDto.page * createEmployeeDataHistoryDto.pageSize,
      // take: createEmployeeDataHistoryDto.pageSize,
    });

    // ** object array group by function
    var groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    // ** filter only history data
    const results = res.filter(function (row) {
      return Math.floor(new Date(row.start_date).getTime() / 86400000) <= Math.floor(new Date().getTime() / 86400000)
    })

    // ** history data group by
    const historyData = groupBy(results, 'type');

    // ** format date
    function formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // ** find different values in two objects
    const difference = (obj1, obj2) => {
      const result = {};
      Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if (key == 'created_at' || key == 'updated_at' || key == 'updated_by' || key == 'id') {
        } else if (key == 'created_by') {
          result[key] = obj1[key];
        } else if (key == 'drivingLicenceCategory') {
          const driverLicenceCategories1 = obj1[key]?.map(item => item.driverLicenceCategory).join(', ');
          const driverLicenceCategories2 = obj2[key]?.map(item => item.driverLicenceCategory).join(', ');
          if(driverLicenceCategories2?.toString() != driverLicenceCategories1?.toString()){
            result[key] = `${driverLicenceCategories2} updated as ${driverLicenceCategories1 ?? ''}`;
          }          
        } else if (key == 'empProvidedCopy' || key == 'visaDoc' || key == 'officialDoc' || key == 'refdoc' || key == 'drivingLicenceDoc' || key == 'tachoDoc' || key == 'cpcCardDoc') {
          if (obj1?.[key]?.[0]?.['docPath'] != obj2?.[key]?.[0]?.['docPath']) {
            result[key] = obj1[key];
          }
        } else if (key == 'isNonNative' && obj2[key] != obj1[key] && !Object.is(obj1[key], obj2[key])) {
          const nationality1 = obj1[key] == 1 ? 'Non-Native' : 'Native';
          const nationality2 = obj2[key] == 1 ? 'Non-Native' : 'Native';
          result[key] = `${nationality2} updated as ${nationality1}`;
        } else if (key == 'start_date' || key == 'type') {
          result[key] = obj1[key];
        } else if ((
          (key == 'dob' ||
            key == 'dateofJoined' ||
            key == 'officialDocIssueDate' ||
            key == 'officialDocExpireDate' ||
            key == 'visaIssueDate' ||
            key == 'visaExpireDate' ||
            key == 'refGivenDate' ||
            key == 'drivingLicenceIssue' ||
            key == 'drivingLicenceExpire' ||
            key == 'drivingLicenceCatDIssue' ||
            key == 'drivingLicenceCatDExpire' ||
            key == 'tachoIssueDate' ||
            key == 'tachoExpireDate' ||
            key == 'cpcCardIssueDate' ||
            key == 'cpcCardExpireDate' ||
            key == 'crbCardIssueDate' ||
            key == 'crbCardExpireDate' ||
            key == 'leaveDate' ||
            key == 'drivingLicenceExpire') &&
          obj2[key] != obj1[key] &&
          !Object.is(obj1[key], obj2[key])
        )) {

          result[key] = `${formatDate(new Date(obj2[key]))} updated as ${formatDate(new Date(obj1[key]))}`;
        } else {
          if (obj2[key] != obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = `${obj2[key]} updated as ${obj1[key]}`;
          }
          if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = difference(obj1[key], obj2[key]);
            if (value !== undefined) {
              result[key] = value;
            }
          }
        }
      });
      return result;
    }

    let result = [];
    const entityManager = getManager();

    // ** get employee type list
    const empTypesList = await entityManager.query(
      `SELECT * FROM employee_type`
    );

    // ** get gender list
    const genderList = await entityManager.query(
      `SELECT * FROM gender`
    );

    // ** get marital status list
    const maritalStatusList = await entityManager.query(
      `SELECT * FROM marital_status`
    );

    // ** get designation list
    const designationList = await entityManager.query(
      `SELECT * FROM employee_designation`
    );

    // ** get country list
    const countryList = await entityManager.query(
      `SELECT * FROM country`
    );

    // ** get bank list
    const bankList = await entityManager.query(
      `SELECT * FROM bank`
    );

    // ** get visa types list
    const visaTypeList = await entityManager.query(
      `SELECT * FROM visa_type`
    );

    // ** get driving license type list
    const dlTypeList = await entityManager.query(
      `SELECT * FROM driving_licence_type`
    );

    // ** get payment frequency type type list
    const paymentTypeList = await entityManager.query(
      `SELECT * FROM payment_frequency`
    );

    // ** format history data
    Object.keys(historyData).forEach(function (key, index) {
      const data = historyData[key];
      const tableData = [];
      for (let row in data) {
        const rowData = data[row]
        const jsonRow = JSON.parse(rowData.data);
        if (jsonRow.hasOwnProperty('employeeType')) {
          let employeeType = empTypesList.find(type => type.id == jsonRow.employeeType);
          jsonRow.employeeType = employeeType
        }
        if (jsonRow.hasOwnProperty('gender')) {
          let gender = genderList.find(gender => gender.id == jsonRow.gender);
          jsonRow.gender = gender
        }
        if (jsonRow.hasOwnProperty('maritalStatus')) {
          let maritalStatus = maritalStatusList.find(status => status.id == jsonRow.maritalStatus);
          jsonRow.maritalStatus = maritalStatus
        }
        if (jsonRow.hasOwnProperty('designation')) {
          let designation = designationList.find(designation => designation.id == jsonRow.designation);
          jsonRow.designation = designation
        }
        if (jsonRow.hasOwnProperty('addressCountry')) {
          let addressCountry = countryList.find(country => country.id == jsonRow.addressCountry);
          jsonRow.addressCountry = addressCountry
        }
        if (jsonRow.hasOwnProperty('refCompAddressCountry')) {
          let refCompAddressCountry = countryList.find(country => country.id == jsonRow.refCompAddressCountry);
          jsonRow.refCompAddressCountry = refCompAddressCountry
        }
        if (jsonRow.hasOwnProperty('bankName')) {
          let bankName = bankList.find(bank => bank.id == jsonRow.bankName);
          jsonRow.bankName = bankName
        }
        if (jsonRow.hasOwnProperty('visaType')) {
          let visaType = visaTypeList.find(visaType => visaType.id == jsonRow.visaType);
          jsonRow.visaType = visaType
        }
        if (jsonRow.hasOwnProperty('drivingLicenceType')) {
          let drivingLicenceType = dlTypeList.find(drivingLicenceType => drivingLicenceType.id == jsonRow.drivingLicenceType);
          jsonRow.drivingLicenceType = drivingLicenceType
        }
        if (jsonRow.hasOwnProperty('paymentFrequency')) {
          let paymentFrequency = paymentTypeList.find(paymentFrequency => paymentFrequency.id == jsonRow.paymentFrequency);
          jsonRow.paymentFrequency = paymentFrequency
        }
        tableData.push({
          id: rowData?.id,
          type: key,
          start_date: rowData?.start_date.toString(),
          updated_at: rowData?.updated_at,
          created_at: rowData?.created_at,
          updated_by: rowData?.updated_by?.firstName,
          created_by: rowData?.created_by?.firstName,
          ...jsonRow
        })
      }

      // ** find changed values
      for (let row in tableData?.reverse()) {
        if (tableData[Number(row) - 1]) {
          const json1 = tableData[row];
          const json2 = tableData[Number(row) - 1];
          const res = difference(json1, json2)
          result.push(res)
        } else {
          // ** add first time records
          const obj2 = tableData[row];
          const res = {};
          Object.keys(obj2).forEach(function (key, index) {
            if (!obj2[key]) {
              return
            }
            if (key == 'created_at' || key == 'updated_at' || key == 'updated_by' || key == 'id') {
            } else if (key == 'created_by') {
              res[key] = obj2[key];
            } else if (key == 'isNonNative') {
              if (obj2[key] == 1) {
                res[key] = 'Non-Native'
              } else {
                res[key] = 'Native'
              }
            } else if (key == 'empProvidedCopy' || key == 'visaDoc' || key == 'officialDoc' || key == 'refdoc' || key == 'drivingLicenceDoc' || key == 'tachoDoc' || key == 'cpcCardDoc') {
              const value = obj2?.[key]?.[0]?.['docPath'];
              if (value !== undefined) {
                res[key] = obj2[key];
              }
            }
            else if (key == 'start_date') {
              res[key] = obj2[key];
            } else if ((
              (key == 'dob' ||
                key == 'dateofJoined' ||
                key == 'officialDocIssueDate' ||
                key == 'officialDocExpireDate' ||
                key == 'visaIssueDate' ||
                key == 'visaExpireDate' ||
                key == 'refGivenDate' ||
                key == 'drivingLicenceIssue' ||
                key == 'drivingLicenceExpire' ||
                key == 'drivingLicenceCatDIssue' ||
                key == 'drivingLicenceCatDExpire' ||
                key == 'tachoIssueDate' ||
                key == 'tachoExpireDate' ||
                key == 'cpcCardIssueDate' ||
                key == 'cpcCardExpireDate' ||
                key == 'crbCardIssueDate' ||
                key == 'crbCardExpireDate' ||
                key == 'leaveDate' ||
                key == 'drivingLicenceExpire')
            )) {
              res[key] = `${formatDate(new Date(obj2[key]))}`;
            } else {
              res[key] = obj2[key];
            }
          });
          if (res.toString() != '{}') {
            result.push(res)
          }
        }
      }

    });
    return result
  }

  async findEmpDataShedule(createEmployeeDataHistoryDto) {
    const [results, totalCount] = await this.empDataHistoryRepository.findAndCount({
      where: {
        employeeId: createEmployeeDataHistoryDto.employeeId,
        type: createEmployeeDataHistoryDto.type,
        status: 1
      },
      relations: ['updated_by', 'created_by'],
      order: {
        start_date: 'DESC',
      },
      // skip: createEmployeeDataHistoryDto.page * createEmployeeDataHistoryDto.pageSize,
      // take: createEmployeeDataHistoryDto.pageSize,
    });

    const sheduleDate = results.filter(function (row) {
      return Math.floor(new Date(row.start_date).getTime() / 86400000) > Math.floor(new Date().getTime() / 86400000)
    })

    return {
      historyList: sheduleDate,
      totalCount,
      totalPages: Math.ceil(totalCount / createEmployeeDataHistoryDto.pageSize),  // Calculate the total number of pages
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeDataHistory`;
  }

  update(id: number, updateEmployeeDataHistoryDto: UpdateEmployeeDataHistoryDto) {
    return `This action updates a #${id} employeeDataHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeDataHistory`;
  }
}

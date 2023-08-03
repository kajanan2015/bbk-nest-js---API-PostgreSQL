import { Injectable } from '@nestjs/common';
import { UpdateCustomerSupportDto } from './update-customer-support.dto';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerSupport, CustomerSupportDetails, CustomerSupportHistory, CustomerSupportStatus, Historydatatype } from './customer-support.entity';

@Injectable()
export class CustomerSupportService {
  constructor(
    @InjectRepository(CustomerSupportDetails)
    private customerSupportDetailsRepository: Repository<CustomerSupportDetails>,
    @InjectRepository(CustomerSupport)
    private customerSupportRepository: Repository<CustomerSupport>,
    @InjectRepository(InquiryType)
    private readonly inquiryTypeRepository: Repository<InquiryType>,
    @InjectRepository(CustomerSupportHistory)
    private readonly customerSupportHistoryRepository: Repository<CustomerSupportHistory>,
  ) { }

  // ** Create inquiry
  async create(customerSupportData) {
    if (customerSupportData?.customerSupportDetailsId && customerSupportData?.customerSupportId) {
      try {
        const customerSupport = {
          id: customerSupportData?.customerSupportId,
          customerSupportDetails: customerSupportData?.customerSupportDetailsId,
          assignDate: customerSupportData?.assignDate,
          assignedBy: customerSupportData?.assignedBy,
          assignedDepartment: customerSupportData?.assignDepartment,
          assignedTo: customerSupportData?.assignTo,
          assignerComment: customerSupportData?.assignerComment,
          status: CustomerSupportStatus.PENDING
        };
        await this.customerSupportRepository.save(customerSupport);

        const historyData = {
          historyDataType: Historydatatype.CUSTOMERSUPPORT,
          historyData: JSON.stringify(customerSupport),
          createdAt: new Date(),
          updatedAt: customerSupportData.assignDate ? customerSupportData.assignDate : null,
          updatedBy: customerSupportData.assignedBy ? customerSupportData.assignedBy : null,
          customerSupport: customerSupportData?.customerSupportId,
          customerSupportDetails: customerSupportData?.customerSupportDetailsId
        }
        const addhistory = await this.customerSupportHistoryRepository.create(historyData)
        const savehistory = await this.customerSupportHistoryRepository.save(addhistory)
      } catch (error) {
        return error;
      }
    } else {
      try {
        const customerSupportDetails = this.customerSupportDetailsRepository.create({
          fullName: customerSupportData.fullName,
          companyName: customerSupportData.companyName,
          email: customerSupportData.email,
          phone: customerSupportData.phone,
          inquiryType: customerSupportData.inquiryType,
          message: customerSupportData.message,
          companyId: customerSupportData.companyId,
          createdAt: new Date(),
          createdBy: customerSupportData.createdBy,
        });

        await this.customerSupportDetailsRepository.save(customerSupportDetails);

        const customerSupport = this.customerSupportRepository.create({
          customerSupportDetails: customerSupportDetails,
          status: CustomerSupportStatus.NEW
        });

        await this.customerSupportRepository.save(customerSupport);

        const historyData = {
          historyDataType: Historydatatype.CUSTOMERSUPPORT,
          historyData: JSON.stringify(customerSupport),
          createdAt: new Date(),
          createdBy: customerSupportData.createdBy,
          updatedAt: customerSupportData.updatedAt ? customerSupportData.updatedAt : null,
          updatedBy: customerSupportData.updatedBy ? customerSupportData.updatedBy : null,
          customerSupport: customerSupport,
          customerSupportDetails: customerSupportDetails
        }
        const addhistory = await this.customerSupportHistoryRepository.create(historyData)
        const savehistory = await this.customerSupportHistoryRepository.save(addhistory)
      } catch (error) {
        return error;
      }
    }
  }

  // ** Find all inquiry
  async findAll() {
    return await this.customerSupportDetailsRepository.find({ relations: ['customerSupport', 'inquiryType'] });
  }

  // ** Find one inquiry
  async findOne(id: number) {
    return await this.customerSupportDetailsRepository.findOne({
      where: { id: id },
      relations: ['customerSupport', 'inquiryType', 'createdBy', 'customerSupport.assignedTo', 'customerSupport.assignedBy', 'customerSupport.resolvedBy', 'customerSupport.assignedDepartment']
    })
  }

  // ** Find inquiry history
  async findHistory(customerSupportId: number) {
    return await this.customerSupportHistoryRepository.find({
      where: { customerSupport: customerSupportId },
      relations: [ 'customerSupportDetails', 'updatedBy', 'createdBy']
    })
  }

  update(id: number, updateCustomerSupportDto: UpdateCustomerSupportDto) {
    return `This action updates a #${id} customerSupport`;
  }

  // ** Get inquiry types
  async getInquiryType() {
    const inquiryTypeList = await this.inquiryTypeRepository.find();
    return inquiryTypeList;
  }
}

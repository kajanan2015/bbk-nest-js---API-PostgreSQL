import { Injectable } from '@nestjs/common';
import { UpdateCustomerSupportDto } from './update-customer-support.dto';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerSupport, CustomerSupportDetails, CustomerSupportHistory, CustomerSupportStatus, Historydatatype } from './customer-support.entity';
import { User } from 'src/user/user.entity';
import { Department } from 'src/departments/department.entity';

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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) { }

  // ** Create inquiry
  async create(customerSupportData) {
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
      })

      await this.customerSupportDetailsRepository.save(customerSupportDetails);

      const customerSupport = this.customerSupportRepository.create({
        customerSupportDetails: customerSupportDetails,
        status: CustomerSupportStatus.NEW
      })

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
      await this.customerSupportHistoryRepository.save(addhistory)
    } catch (error) {
      return error;
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
      relations: ['customerSupport', 'inquiryType', 'createdBy', 'customerSupport.assignedTo', 'customerSupport.assignedBy', 'customerSupport.assignedDepartment']
    })
  }

  // ** Find inquiry history
  async findHistory(customerSupportId: number) {
    return await this.customerSupportHistoryRepository.find({
      where: { customerSupport: customerSupportId },
    })
  }

  async update(customerSupportData) {
    if (customerSupportData?.customerSupportDetailsId && customerSupportData?.customerSupportId) {
      try {
        const previousData = await this.customerSupportHistoryRepository.findOne({
          where: { customerSupport: customerSupportData?.customerSupportId },
          relations: ['createdBy']
        });

        const customerSupportDetailsEntity = await this.userRepository.findOne(customerSupportData?.customerSupportDetailsId)
        const assignedByEntity = await this.userRepository.findOne(customerSupportData?.assignedBy)
        const assignedToEntity = await this.userRepository.findOne(customerSupportData?.assignedTo)
        const assignedDepartmentEntity = await this.departmentRepository.findOne(customerSupportData?.assignDepartment)

        const customerSupport = {
          id: customerSupportData?.customerSupportId,
          customerSupportDetails: customerSupportDetailsEntity,
          assignDate: customerSupportData?.assignDate,
          assignedBy: assignedByEntity,
          assignedDepartment: assignedDepartmentEntity,
          assignedTo: assignedToEntity,
          assignerComment: customerSupportData?.assignerComment,
          status: CustomerSupportStatus.PENDING
        }
        await this.customerSupportRepository.save(customerSupport);

        const historyData = {
          historyDataType: Historydatatype.CUSTOMERSUPPORT,
          historyData: JSON.stringify(customerSupport),
          createdBy: previousData?.createdBy,
          createdAt: previousData?.createdAt,
          updatedAt: customerSupportData.assignDate ? customerSupportData.assignDate : null,
          updatedBy: customerSupportData.assignedBy ? customerSupportData.assignedBy : null,
          customerSupport: customerSupportData?.customerSupportId,
          customerSupportDetails: customerSupportData?.customerSupportDetailsId
        }
        const addhistory = await this.customerSupportHistoryRepository.create(historyData)
        await this.customerSupportHistoryRepository.save(addhistory)
      } catch (error) {
        return error;
      }
    }
  }

  // ** Get inquiry types
  async getInquiryType() {
    const inquiryTypeList = await this.inquiryTypeRepository.find();
    return inquiryTypeList;
  }
}

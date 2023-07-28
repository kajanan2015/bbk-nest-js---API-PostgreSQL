import { Injectable } from '@nestjs/common';
import { UpdateCustomerSupportDto } from './update-customer-support.dto';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerSupport, CustomerSupportDetails } from './customer-support.entity';

@Injectable()
export class CustomerSupportService {
  constructor(
    @InjectRepository(CustomerSupportDetails)
    private customerSupportDetailsRepository: Repository<CustomerSupportDetails>,
    @InjectRepository(CustomerSupport)
    private customerSupportRepository: Repository<CustomerSupport>,
    @InjectRepository(InquiryType)
    private readonly inquiryTypeRepository: Repository<InquiryType>,
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
      });
      console.log(customerSupportDetails, 9090)

      await this.customerSupportDetailsRepository.save(customerSupportDetails);

      const customerSupport = this.customerSupportRepository.create({
        customerSupportDetailsId: customerSupportDetails,
        status: customerSupportData.status,
        resolvedAt: customerSupportData.resolvedAt,
        resolvedBy: customerSupportData.resolvedBy,
        assignDate: customerSupportData.assignDate,
        assignedBy: customerSupportData.assignedBy,
      });

      return this.customerSupportRepository.save(customerSupport);
    } catch (error) {
      return error;
    }
  }

  // ** Find all inquiry
  async findAll() {
    return await this.customerSupportRepository.find({ relations: ['inquiryType'] });
  }

  // ** Find one inquiry
  async findOne(id: number) {
    return await this.customerSupportRepository.findOne({
      where: { id: id },
      relations: ["inquiryType"],
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

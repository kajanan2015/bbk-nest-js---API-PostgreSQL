import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';

export class UpdateCompanyPaymentDto extends PartialType(CreateCompanyPaymentDto) {}

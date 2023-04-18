
import { Employee } from 'src/employee/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
@Entity('company')
export class CompaniesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {  length: 30 })
  companyName: string | null;

  @Column("varchar", {  length: 30 })
  companyEmail: string | null;

  @Column("varchar", {  length: 30 })
  companyContact: string | null;

  @Column({ type: 'boolean', default:true})
  companyStatus: Boolean;

  @Column("int")
  createdBy: number;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @ManyToOne(() => CompaniesEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subCompanyId' })
  mainCompany: CompaniesEntity;

  get subCompanyId(): number {
    return this.mainCompany ? this.mainCompany.id : 0;
  }

  set subCompanyId(value: number) {
  }
  
  @ManyToMany(() => Employee, (employee) => employee.companies)
  employees: Employee[];
}

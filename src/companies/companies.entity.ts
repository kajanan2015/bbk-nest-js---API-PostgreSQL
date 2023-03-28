import { Employee } from 'src/employee/entities/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
@Entity('company')
export class CompaniesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 30 })
  name: string | null;

  @Column({ type: 'boolean', default:true})
  status: Boolean;

  @Column("int", { name: "creaby", nullable: true })
  creaby: number;

  @Column("timestamp", { name: "createdatlocal", default: () => "CURRENT_TIMESTAMP" })
  createdatlocal: Date;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @ManyToMany(() => Employee, (employee) => employee.companies)
  employees: Employee[];
}

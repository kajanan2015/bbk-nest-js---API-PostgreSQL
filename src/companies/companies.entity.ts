import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('company')
export class CompaniesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 30 })
  name: string | null;

  @Column("int", { name: "creaby", nullable: true })
  creaby: number;

  @Column("timestamp", { name: "createdatlocal", default: () => "CURRENT_TIMESTAMP" })
  createdatlocal: Date;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

 
}


import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
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
  companyStatus: boolean;

  @Column("varchar", {  length: 100 })
  companyWebsite: string;

  @Column("varchar", {  length: 100 })
  companyLogo: string;

  @Column("varchar", {  length: 100,nullable:true,default: () => null })
  companyCode: string;

  @Column("int",{nullable:true,default: () => null})
  createdBy: number;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  
  @ManyToOne(() => CompaniesEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentCompanyId' })
  mainCompany: CompaniesEntity;

  get parentCompanyId(): number {
    return this.mainCompany ? this.mainCompany.id : 0;
  }

  set parentCompanyId(value: number) {
  }

  @ManyToMany(() => PagePermissionEntity, (page) => page.companies)
  @JoinTable()
  pages: PagePermissionEntity[];
}

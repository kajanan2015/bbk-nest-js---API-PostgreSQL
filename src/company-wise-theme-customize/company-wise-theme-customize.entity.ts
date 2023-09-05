import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from 'src/user/user.entity';
@Entity("company-theme-data")
export class CompanyWiseThemeCustomize {
    @PrimaryGeneratedColumn()
    data_id: number;

    @Column("text", { nullable: true ,default: () => null})
    theme_data: string;

    @ManyToOne(() => CompaniesEntity, company => company.themedata)
    @JoinColumn({ name: 'companyId' })
    company: CompaniesEntity;
  
    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

    @ManyToOne(() => User, usercretae => usercretae.themedatacreateby)
    @JoinColumn({ name: 'createdBy' })
    created_by: User;

    @ManyToOne(() => User, userupdate => userupdate.themedataupdatedby)
    @JoinColumn({ name: 'updatedBy' })
    updated_by: User;

    @Column("timestamp", { name: "updated_at",nullable:true, default: () => null })
    updatedat: Date;
}

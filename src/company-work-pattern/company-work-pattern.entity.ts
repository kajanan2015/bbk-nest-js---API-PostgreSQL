import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity()
export class CompanyWorkPattern {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    workPatternName: string;


    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    workPatternCode: string;

    @Column("tinyint", { default: 0, comment: ' 0-withouttime,1-withtime' })
    workType: number;


    @Column("tinyint", { default: 1, comment: ' 1-default 7 day pattern,2-more than 7 days, 3-custom pattern' })
    patternType: number;

    @Column("int", { nullable: true, default: () => null })
    noOfDays: number;

    @Column("int", { nullable: true, default: () => null })
    noOfWeeks: number;

    @Column("int", { nullable: true, default: () => null })
    noOfWorkDays: number;

    @Column("int", { nullable: true, default: () => null })
    noOfOffDays: number;

    @ManyToOne(() => CompaniesEntity, company => company.workpattern)
    @JoinColumn({ name: 'companyId' })
    company: CompaniesEntity;
  
}

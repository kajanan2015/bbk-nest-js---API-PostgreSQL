import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity()
export class Createpackage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{ nullable: true, default: () => null})
    packagename:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    packagelogo: string;

    @Column("varchar",{ nullable: true, default: () => null})
    numberOfDays:string;

    @Column("timestamp", { name: "starteddate", default: () => "CURRENT_TIMESTAMP" })
    starteddate: Date;

    @Column("timestamp",  { name: "updatedat", nullable:true, default: () => null })
    enddate: Date;
    
    @Column("boolean",{ default: false, comment: ' 0-valid, 1-ended' })
    validity:boolean
    
    @Column("tinyint", { default: 1, comment: ' 1-active, 2-inactive, 3-deactivate' })
    status: number;

    @OneToMany(()=>Moduledetailsofpackage, packagedetails => packagedetails.packages,{cascade:true})
    packagedetails:Moduledetailsofpackage[]

    @ManyToOne(() => User, usercretae => usercretae.pkgcreatedby)
    @JoinColumn({ name: 'createdBy' })
    pkgcreate: User;

  
    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;
  
    @Column("timestamp", { name: "updatedat", nullable:true, default: () => null })
    updatedat: Date;


    @ManyToOne(() => User, usercretae => usercretae.pkgupdateby)
    @JoinColumn({ name: 'updatedBy' })
    pkgupdate: User;

    

}

import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
@Entity()
export class Createmodule {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("varchar",{ nullable: true, default: () => null})
    modulename:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    modulelogo: string;
    
    @Column("tinyint", { nullable: true, default:1, comment: ' 1-active, 2-inactive, 3-deactivate' })
    status: number;

    @OneToMany(()=>Moduledetailsofpackage, moduledetails => moduledetails.module,{cascade:true})
    moduledetails:Moduledetailsofpackage[]

    
    @ManyToOne(() => User, usercretae => usercretae.modulecreatedby)
    @JoinColumn({ name: 'createdBy' })
    modulecreate: User;

  
    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;
  
    @Column("timestamp", { name: "updatedat", default: () => null })
    updatedat: Date;


    @ManyToOne(() => User, usercretae => usercretae.moduleupdateby)
    @JoinColumn({ name: 'updatedBy' })
    moduleupdate: User;

    @ManyToMany(() => CompaniesEntity, module => module.module)
    @JoinTable()
    company: CompaniesEntity[];

    @OneToMany(()=>Companypackagerow, packagerow => packagerow.module,{cascade:true})
    companypackagerow:Companypackagerow[];

}

import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
@Entity()
export class Createpackage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{ nullable: true, default: () => null})
    packagename:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    packagelogo: string;
    
    @Column("tinyint", { default: 1, comment: ' 1-active, 2-inactive, 3-deactivate' })
    status: number;

    @OneToMany(()=>Moduledetailsofpackage, packagedetails => packagedetails.packages,{cascade:true})
    packagedetails:Moduledetailsofpackage[]

}

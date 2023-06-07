import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Modulepackagerelationship } from 'src/createpackage/modulepackagerelationship.entity';
import { ModuleCost } from 'src/createpackage/modulecost.entity';
@Entity()
export class Createmodule {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("varchar",{ nullable: true, default: () => null})
    modulename:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    modulelogo: string;
    
    @Column("bigint", { default: 1, comment: ' 0-pending, 1-active, 2-deactivate' })
    status: number;

    @OneToMany(() => ModuleCost, costs => costs.moduledata)
    costid: ModuleCost[];
}

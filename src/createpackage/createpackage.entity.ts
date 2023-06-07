import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { ModuleCost } from './modulecost.entity';
import { Modulepackagerelationship } from './modulepackagerelationship.entity';
@Entity()
export class Createpackage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{ nullable: true, default: () => null})
    packagename:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    packagelogo: string;
    
    @Column({ type: 'boolean', default:true})
    status: Boolean;

    
    @OneToMany(() => Modulepackagerelationship, relationship => relationship.package)
    modules: Modulepackagerelationship[];
}

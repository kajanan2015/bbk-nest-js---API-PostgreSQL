import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('driver')
export class DriverEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
  
    @Column("varchar", { name: "name", nullable: true, length: 30 })
    driverName: string | null;
  
    @Column({ nullable: true})
    driverDob: Date;
  
    @Column("varchar", { nullable: false , length: 100 })
    driverAddress: string;
  
    @Column("varchar", { nullable: false , length: 100 })
    driverEmail: string;

    @Column("varchar", { nullable: false , length: 100 })
    driverPassword: string;
  
    @Column("varchar", { nullable: false , length: 100 })
    driverPhone: string;
  
    @Column({ type: 'boolean', default:true})
    driverStatus: Boolean;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;
  
    @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
    updatedat: Date;
}

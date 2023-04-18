
import { Employee } from 'src/employee/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
@Entity('driver_type')
export class DriverTypeEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "driverType", nullable: true, length: 30 })
  driverType: string | null;

  @Column({ type: 'boolean', default:true})
  status: Boolean;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;
}

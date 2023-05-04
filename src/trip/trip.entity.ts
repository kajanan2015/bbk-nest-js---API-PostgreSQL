
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
@Entity('trip')
export class TripEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "code", nullable: true, length: 20 })
  code: string | null;

  @Column("int")
  movementId: number;

  @Column("varchar")
  frameLayout: string;

  
  @Column("varchar")
  defectStatus: string;

  @Column("varchar")
  previousMileage: string;

  @Column("timestamp", { name: "date", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column("varchar",{default: 'NOTSTARTED'})
  res: string;

  @Column({ type: 'boolean', default:true})
  status: Boolean;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;
 
  @Column("timestamp", { name: "startedTime",nullable:true, default: null })
  startedTime: Date;

  @Column("timestamp", { name: "completedTime",nullable:true, default: null })
  completedTime: Date;

  @ManyToOne(() => User, user => user.jobdata)
  @JoinColumn()
  jobuser: User;
  
  @ManyToOne(() => Vehicle, vehicle => vehicle.vehicletrip)
  @JoinColumn()
  vehicle: Vehicle;
}

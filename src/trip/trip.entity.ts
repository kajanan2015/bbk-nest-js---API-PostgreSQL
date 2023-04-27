
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
@Entity('trip')
export class TripEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "code", nullable: true, length: 20 })
  code: string | null;

  @Column("int")
  driverId: number;

  @Column("int")
  vehicleId: number;

  @Column("int")
  movementId: number;

  @Column("varchar")
  frameLayout: string;

  @Column("varchar")
  vehicleCompany: string;
  
  @Column("varchar")
  defectStatus: string;

  @Column("varchar")
  previousMileage: string;

  @Column("timestamp", { name: "date", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column("varchar")
  res: string;

  
  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;
 
}

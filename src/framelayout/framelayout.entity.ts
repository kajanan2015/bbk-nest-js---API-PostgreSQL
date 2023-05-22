import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity('framelayout')
export class Framelayout {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
  
  
    @Column("varchar", { name: "vmake", nullable: true, length: 50 })
    vmake: string | null;
  
  
    @Column("varchar", { name: "vtype", nullable: true, length: 10 })
    vtype: string | null;
  
    @Column("varchar", { name: "vimage", nullable: true, length: 100 })
    vimage: string | null;
  
    
    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;
  
    @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
    updatedat: Date;
}


import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity('pagepermission')
export class pagepermissionEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "formname", nullable: true, length: 30 })
  formname: string | null;

  @Column("varchar", { name: "path", nullable: true, length: 50 })
  path: string | null;

  @Column({ name: "l1_parent_page_id", nullable: true})
  main_page: number;

  @Column({ type: 'boolean', default:true})
  status: Boolean;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

}

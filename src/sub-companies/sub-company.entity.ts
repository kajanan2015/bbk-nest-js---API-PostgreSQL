import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("sub_company")
export class SubCompanyEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "maincompanyid", nullable: true })
  maincompanyid: number | null;

  @Column("varchar", { name: "subcompanyname", nullable: true, length: 30 })
  subcompanyname: string | null;

  @Column("varchar", { name: "companyaddress", nullable: true, length: 30 })
  companyaddress: string | null;

  @Column("varchar", { name: "contactnum", nullable: true, length: 30 })
  contactnum: string | null;

  @Column({ type: "boolean", default: true })
  subcompanystatus: Boolean;

  @Column("timestamp", {
    name: "createdat",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat: Date;

  @Column("timestamp", {
    name: "updatedat",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedat: Date;
}

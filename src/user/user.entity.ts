import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column("varchar", { name: "utype", default: () => "'USER'", length: 6 })
  utype: string ;

  @Column("int", { name: "empId", nullable: true })
  empId: number;

  @Column("int", { name: "drvId", nullable: true })
  drvId: number;

  @Column({ type: 'boolean', default:true})
  status: Boolean;
  

}

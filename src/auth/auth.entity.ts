// added by nuwan and kanjanan
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";


@Entity('userloginip')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  userid: number;

  @Column({ nullable: true })
  ipAddress: string;

  @Column("timestamp", { name: "loginat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

}

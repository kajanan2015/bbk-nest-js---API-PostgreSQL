
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { TripEntity } from 'src/trip/trip.entity';
@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  middleName: string;

  @Column({ length: 500 })
  lastName: string;

  @Column("varchar", { nullable: false , length: 30, default: () => null })
  employeeNumber: string;

  @Column({ nullable: true})
  dob: Date;

  @Column("varchar", { nullable: false , length: 100 })
  address: string;

  @Column({ length: 500 })
  email: string;

  @Column("varchar", { nullable: false , length: 100 })
  phone: string;

  @Column("varchar", { nullable: true , length: 30 })
  nationality: string;

  @Column("varchar", { nullable: true , length: 30 })
  country: string;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  profilePic: string;

  @Column({ length: 500 })
  password: string;

  @Column("varchar", { name: "utype", default: () => "'USER'", length: 6 })
  uType: string ;

  @Column({ type: 'boolean', default:true})
  status: Boolean;
  
  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @ManyToMany(() => PermissionRoleEntity, (role) => role.employees)
  @JoinTable()
  roles: PermissionRoleEntity[];

  @OneToMany(()=>TripEntity, trip => trip.jobuser,{cascade:true})
  jobdata:TripEntity[]
}

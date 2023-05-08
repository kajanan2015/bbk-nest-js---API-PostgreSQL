
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { TripEntity } from 'src/trip/trip.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true , length: 250, default: () => null })
  firstName: string|null;

  @Column("varchar",{ nullable: true , length: 250, default: () => null })
  middleName: string;

  @Column({ nullable: true , length: 250, default: () => null })
  lastName: string|null;

  @Column("varchar",{ nullable: true , length: 250, default: () => null })
  employeeNumber: string|null;

  @Column({ nullable: true , default: () => null })
  dob: Date|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  address: string|null;

  @Column({ nullable: true , length: 250, default: () => null })
  email: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  phone: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  nationality: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  country: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  profilePic: string|null;

  @Column({ nullable: true , length: 250, default: () => null })
  password: string|null;

  @Column("varchar", { name:"utype", default: () => "'USER'", length: 50 })
  uType: string|null ;

  @Column({ type: 'boolean', default:true})
  status: Boolean|null;
  
  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date|null;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date|null;

  @ManyToMany(() => PermissionRoleEntity, (role) => role.employees)
  @JoinTable()
  roles: PermissionRoleEntity[];

  @OneToMany(()=>TripEntity, trip => trip.jobuser,{cascade:true})
  jobdata:TripEntity[]

  @ManyToMany(() => CompaniesEntity, company => company.users)
  companies: CompaniesEntity[];
}

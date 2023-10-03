
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
@Entity('permission_role')
export class PermissionRoleEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "roleName", nullable: true, length: 30 })
  roleName: string | null;

  @Column({ type: 'boolean', default:true})
  roleStatus: Boolean;

  @Column("int",{nullable:true, default: () => null})
  assignCompany: number;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @ManyToMany(() => User, (employee) => employee.roles)
  employees: User[];
}

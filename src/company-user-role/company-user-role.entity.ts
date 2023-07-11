import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('companyUserRole')
export class CompanyUserRole {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("varchar",{ nullable: true, default: () => null})
    userName:string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    userEmail: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    userPhone: string | null;

    
    @Column("varchar", { nullable: true, length: 250, default: () => null })
    userType: string | null;

    
    @Column("varchar", { nullable: true, length: 250, default: () => null })
    password: string | null;

    @Column("varchar",{ nullable: true, default: () => null})
    profilePicture: string;

    @Column("tinyint", { nullable: true, default:1, comment: ' 1-active, 2-inactive, 3-deactivate' })
    status: number;
    
    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;
  
    @Column("timestamp", { name: "updatedat", default: () => null })
    updatedat: Date;
}

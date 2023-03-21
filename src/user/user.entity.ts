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

  @Column("varchar", { name: "bisDis", nullable: true , length: 100 })
  bisDis: string | null;

  @Column("varchar", { name: "bisName", nullable: true , length: 100 })
  bisName: string | null;

  @Column("varchar", { name: "bisLoc", nullable: true , length: 100 })
  bisLoc: string | null;

  @Column("varchar", { name: "notDis", nullable: true , length: 10 })
  notDis: string | null;

  @Column("varchar", { name: "phone", nullable: true , length: 30 })
  phone: string | null;

  @Column("varchar", { name: "contactmethod", nullable: true , length: 10 })
  contactmethod: string | null;

  @Column("varchar", { name: "telephone", nullable: true , length: 20 })
  telephone: string | null;

  @Column("varchar", { name: "arn", nullable: true , length: 30 })
  arn: string | null;

  @Column("varchar", { name: "burl", nullable: true , length: 100 })
  burl: string | null;

  @Column("varchar", { name: "rbisName", nullable: true , length: 50 })
  rbisName: string | null;

  @Column("varchar", { name: "fburl", nullable: true , length: 100 })
  fburl: string | null;

  @Column("varchar", { name: "twitterurl", nullable: true , length: 100 })
  twitterurl: string | null;

  @Column("varchar", { name: "linkedinurl", nullable: true , length: 100 })
  linkedinurl: string | null;

  @Column("varchar", { name: "instagramurl", nullable: true , length: 100 })
  instagramurl: string | null;

  @Column("varchar", { name: "mondaystart", nullable: true , length: 10 })
  mondaystart: string | null;

  @Column("varchar", { name: "mondayclose", nullable: true , length: 10 })
  mondayclose: string | null;

  @Column("varchar", { name: "tuesdaystart", nullable: true , length: 10 })
  tuesdaystart: string | null;

  @Column("varchar", { name: "tuesdayclose", nullable: true , length: 10 })
  tuesdayclose: string | null;


  @Column("varchar", { name: "wednesdaystart", nullable: true , length: 10 })
  wednesdaystart: string | null;
  @Column("varchar", { name: "wednesdayclose", nullable: true , length: 10 })
  wednesdayclose: string | null;


  @Column("varchar", { name: "thursdaystart", nullable: true , length: 10 })
  thursdaystart: string | null;
  @Column("varchar", { name: "thursdayclose", nullable: true , length: 10 })
  thursdayclose: string | null;


  @Column("varchar", { name: "fridaystart", nullable: true , length: 10 })
  fridaystart: string | null;
  @Column("varchar", { name: "fridayclose", nullable: true , length: 10 })
  fridayclose: string | null;

  @Column("varchar", { name: "saturdaystart", nullable: true , length: 10 })
  saturdaystart: string | null;
  @Column("varchar", { name: "saturdayclose", nullable: true , length: 10 })
  saturdayclose: string | null;


  @Column("varchar", { name: "sundaystart", nullable: true , length: 10 })
  sundaystart: string | null;
  @Column("varchar", { name: "sundayclose", nullable: true , length: 10 })
  sundayclose: string | null;


  @Column("bigint", { name: "packagesId", default: () => "'0'" })
  packagesId: number;

  @Column("varchar", { name: "utype", default: () => "'USER'", length: 6 })
  utype: string ;

  
  

}

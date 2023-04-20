
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
@Entity('pages')
export class PagePermissionEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { nullable: true, length: 30 })
  pageName: string | null;

  @Column("varchar", { nullable: true, length: 50 })
  pageURL: string | null;

  @ManyToOne(() => PagePermissionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentPageId' })
  parentPage: PagePermissionEntity;

  get parentPageId(): number {
    return this.parentPage ? this.parentPage.id : 0;
  }

  set parentPageId(value: number) {
  }

  @Column({ type: "int", unsigned: true })
  createdBy: number;

  @Column({ type: 'boolean', default:true})
  pageStatus: Boolean;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

}

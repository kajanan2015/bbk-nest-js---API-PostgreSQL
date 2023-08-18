import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country_city')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    name: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    state_id: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    state_code: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    country_code: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    latitude: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    longitude: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    flag: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    wikidataid: string;

    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
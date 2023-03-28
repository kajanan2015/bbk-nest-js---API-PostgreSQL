import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Request } from "express";
import { IpAddressMiddleware } from "./auth.middlewareware";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  lastLoginTime: Date;


  @Column({ nullable: true })
  ipAddress: string;

  @BeforeInsert()
  async setLoginTimeAndIpOnCreate() {
    const request: Request = IpAddressMiddleware.getRequest();
    this.lastLoginTime = new Date();
    this.ipAddress = request.ipAddress;
  }

  @BeforeUpdate()
  async setLoginTimeAndIpOnUpdate() {
    const request: Request = IpAddressMiddleware.getRequest();
    this.lastLoginTime = new Date();
    this.ipAddress = request.ipAddress;
  }
}

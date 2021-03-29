import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ConsentType {
 email_notifications = 'email_notifications',
 sms_notifications = 'sms_notifications'
}

export abstract class Consent {
 @Column({ type: 'enum', enum: ConsentType })
 id: ConsentType;

 @Column({ type: 'bool', default: false })
 enabled: boolean;
}

@Entity()
export class User extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({ type: 'varchar', length: 200 })
 email: string;
 
 @Column('jsonb', { nullable: true })
 consents?: Consent[]
}

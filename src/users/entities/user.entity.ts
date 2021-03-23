import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

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
export class User {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({ type: 'varchar', length: 200 })
 email: string;
 
 @Column('jsonb', { nullable: true })
 consents: Consent[]
}

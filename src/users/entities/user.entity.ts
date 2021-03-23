import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

export enum ConsentType {
 email_notifications = 'email_notifications',
 sms_notifications = 'sms_notifications'
}

@Entity()
export class Consent {
 @PrimaryGeneratedColumn()
 consentId: number;

 @Column({ type: 'enum', enum: ConsentType })
 id: ConsentType;

 @Column({ type: 'bool', default: false })
 enabled: boolean;

 @ManyToOne(() => User, user => user.id)
 user: User;
}

@Entity()
export class User {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({ type: 'varchar', length: 200 })
 email: string;
 
 @OneToMany(type => Consent, consent => consent.user, {
     eager: true
 })
 consents: Consent[]
}

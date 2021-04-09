import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '../../users/entities/user.entity';

export enum ConsentType {
 email_notifications = 'email_notifications',
 sms_notifications = 'sms_notifications'
}

@Entity('consents')
export class Consent extends BaseEntity {
 @PrimaryColumn({ type: 'enum', enum: ConsentType })
 name: ConsentType;

 @PrimaryColumn()
 userId: string;

 @ManyToOne(() => User, user => user.consents, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
 user!: User;
}

// @Entity('events')
// export class Event {
//  @Column({ type: 'enum', enum: ConsentType })
//  id: ConsentType;

//  @OneToMany(() => User, user => user.id)
//  consents: User[];
// }
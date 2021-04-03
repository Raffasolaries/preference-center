import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../users/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum ConsentType {
 email_notifications = 'email_notifications',
 sms_notifications = 'sms_notifications'
}

export abstract class SimplifiedConsent {
 id: ConsentType;
 enabled: boolean;
}

@Entity('consents')
export class Consent extends BaseEntity {
 @Column({ type: 'enum', enum: ConsentType, nullable: true })
 name: ConsentType;

 @ManyToOne(() => User, user => user.consents)
 @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
 user: User;
}

// @Entity('events')
// export class Event {
//  @Column({ type: 'enum', enum: ConsentType })
//  id: ConsentType;

//  @OneToMany(() => User, user => user.id)
//  consents: User[];
// }
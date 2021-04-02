import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../../users/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum ConsentType {
 email_notifications = 'email_notifications',
 sms_notifications = 'sms_notifications'
}

@Entity('consents')
export class Consent extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 uuid: string;

 @Column({ type: 'enum', enum: ConsentType })
 id: ConsentType;

 @ManyToOne(() => User, user => user.id)
 user: User;
}

// @Entity('events')
// export class Event {
//  @Column({ type: 'enum', enum: ConsentType })
//  id: ConsentType;

//  @OneToMany(() => User, user => user.id)
//  consents: User[];
// }
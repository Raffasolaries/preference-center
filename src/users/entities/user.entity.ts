import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Consent } from '../../events/entities/event.entity';

@Entity('users')
export class User extends BaseEntity {
 @Column({ type: 'varchar', length: 200 })
 email: string;
 
 // @Column('jsonb', { nullable: true })
 @OneToMany(() => Consent, consent => consent.user)
 consents?: Consent[]
}

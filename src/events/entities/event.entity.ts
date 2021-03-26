import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Consent, User } from '../../users/entities/user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @ManyToOne(() => User, user => user.id)
 user: User;
}
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Consent, User } from '../../users/entities/user.entity';

// @Entity({ name: 'events' })
export class Event {
 // @PrimaryGeneratedColumn('uuid')
 user: User;

 // @ManyToOne(() => User, user => user.id)
 consents: Consent[];
}
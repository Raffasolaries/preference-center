import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Consent, User } from '../../users/entities/user.entity';

@Entity()
export class Event {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @ManyToOne(() => User, user => user.id)
 user: User;
}

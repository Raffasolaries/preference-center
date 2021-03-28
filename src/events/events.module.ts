import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { User } from '../users/entities/user.entity';

@Module({
 imports: [TypeOrmModule.forFeature([User])],
 controllers: [EventsController],
 providers: [EventsService]
})
export class EventsModule {}

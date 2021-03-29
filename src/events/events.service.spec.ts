import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { EventsService } from './events.service';
import { User } from '../users/entities/user.entity';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
       TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
       TypeOrmModule.forFeature([User])
      ],
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

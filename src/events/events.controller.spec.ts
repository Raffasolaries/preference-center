import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { User } from '../users/entities/user.entity';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      TypeOrmModule.forFeature([User])
     ],
     controllers: [EventsController],
     providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

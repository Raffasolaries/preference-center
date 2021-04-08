import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Consent } from '../events/entities/event.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      TypeOrmModule.forFeature([User, Consent])
     ],
     providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { configService } from '../config/config.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      TypeOrmModule.forFeature([User])
     ],
     controllers: [UsersController],
     providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

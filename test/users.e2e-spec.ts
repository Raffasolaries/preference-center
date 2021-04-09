import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src/users/users.module';
import { EventsModule } from './../src/events/events.module';
import { UsersService } from './../src/users/users.service';
import { UserDTO, SimplifiedUserDTO } from './../src/users/dto/user.dto';

describe('Users (e2e)', () => {
 let app: INestApplication;
 let userPayload = { email: 'raffasolaries@gmail.com' };
 let userId = '97121a44-035d-421e-97f9-b27438109901';
 let deletedUser = { raw: [], affected: 1 };
 let usersService = { 
  findAll: async () => {
   return [{
    id: userId,
    email: 'raffasolaries@gmail.com',
    consents: []
   }];
  },
  findOne: async (id: string) => {
   return {
    id: userId,
    email: 'raffasolaries@gmail.com',
    consents: []
   };
  },
  create: async (dto: UserDTO) => {
   return {
    id: userId,
    email: 'raffasolaries@gmail.com',
    consents: []
   };
  },
  remove: async (id: string) => {
   return deletedUser;
  }
 };
 

 beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
   imports: [AppModule, UsersModule, EventsModule]
  })
  .overrideProvider(UsersService)
  .useValue(usersService)
  .compile();

  app = moduleFixture.createNestApplication();
  await app.init();
 });

 it('/users (POST)', async (done) => {
  await request(app.getHttpServer())
   .post('/users')
   .send(userPayload)
   .set('Accept', 'application/json')
   .expect('Content-Type', /json/)
   .expect(201)
   .expect(await usersService.create(userPayload));
  return done();
 });

 it('/users (GET)', async (done) => {
  await request(app.getHttpServer())
   .get('/users')
   .expect(200)
   .expect(await usersService.findAll());
  return done();
 });

 it('/users/{id} (GET)', async (done) => {
  await request(app.getHttpServer())
   .get('/users/placeholder')
   .expect(200)
   .expect(await usersService.findOne(userId));
  return done();
 });

 it('/users/{id} (DELETE)', async (done) => {
  await request(app.getHttpServer())
   .delete('/users/placeholder')
   .expect(200)
   .expect(await usersService.remove(userId));
  return done();
 });

 afterAll(async () => {
  await app.close();
 });
});
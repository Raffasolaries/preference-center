import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src/users/users.module';
import { EventsModule } from './../src/events/events.module';
import { UsersService } from './../src/users/users.service';
import { UserDTO } from './../src/users/dto/user.dto';

describe('Users (e2e)', () => {
 let app: INestApplication;
 let userPayload = { email: 'raffasolaries@gmail.com' };
 let deletedUser = { raw: [], affected: 1 };
 let usersService = { 
  findAll: () => {
   return [{
    id: 'placeholder',
    email: 'raffasolaries@gmail.com',
    consents: []
   }];
  },
  findOne: (id: string) => {
   return {
    id: 'placeholder',
    email: 'raffasolaries@gmail.com',
    consents: []
   };
  },
  create: (dto: UserDTO) => {
   return {
    id: 'placeholder',
    email: 'raffasolaries@gmail.com',
    consents: []
   };
  },
  remove: (id: string) => {
   return { raw: [], affected: 1 };
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

 it('/users (POST)', async () => {
  return await request(app.getHttpServer())
   .post('/users')
   .send(userPayload)
   .set('Accept', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(response => {
    expect(response.body.email).toEqual(userPayload.email);
   }).catch(err => err);
 });

 it('/users (GET)', async (done) => {
  return await request(app.getHttpServer())
   .get('/users')
   .expect(200)
   .then(response => {
    expect(response.body[0].email).toEqual(userPayload.email);
    done();
   }).catch(err => err);
 });

 it('/users/{id} (GET)', async (done) => {
  return await request(app.getHttpServer())
   .get('/users/placeholder')
   .expect(200)
   .then(response => {
    expect(response.body.email).toEqual(userPayload.email);
    done()
   })
   .catch(err => err)
 });

 it('/users/{id} (DELETE)', async (done) => {
  return await request(app.getHttpServer())
   .delete('/users/placeholder')
   .expect(200)
   .then(response => {
    expect(response.body).toEqual(deletedUser);
    done()
   })
   .catch(err => err)
 });

 afterAll(async () => {
  await app.close();
 });
});
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/users/users.service';

describe('AppController (e2e)', () => {
 let app: INestApplication;

 beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
   imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
 });

 it('/ (GET)', (done) => {
  return request(app.getHttpServer())
   .get('/')
   .expect(200)
   .then(result => {
     // expect(result.status).toEqual(200)
     expect(result.text).toEqual('Hello World!');
     done();
   })
   .catch(err => err)
 });

 afterAll(async () => {
  await app.close();
 });
});

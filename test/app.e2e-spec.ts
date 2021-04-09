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

 it('/ (GET)', async (done) => {
  await request(app.getHttpServer())
   .get('/')
   .expect(200)
   .expect('Hello World!');
  return done();
 });

 afterAll(async () => {
  await app.close();
 });
});

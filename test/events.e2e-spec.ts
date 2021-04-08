import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src/users/users.module';
import { EventsModule } from './../src/events/events.module';
import { EventsService } from './../src/events/events.service';
import { EventDTO } from './../src/events/dto/event.dto';

describe('Events (e2e)', () => {
 let app: INestApplication;
 let eventPayload = {
  user: {
   id: 'placeholder'
  },
  consents: [
   {
    id: 'email_notifications',
    enabled: true
   },
   {
    id: 'sms_notifications',
    enabled: true
   }
  ]
 };
 let eventsService = { 
  update: (dto: EventDTO) => {
   return {
    user: {
     id: 'placeholder'
    },
    updatedConsents: [
     {
      id: 'email_notifications',
      enabled: true
     },
     {
      id: 'sms_notifications',
      enabled: true
     }
    ]
   };
  }
 };
 

 beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
   imports: [AppModule, UsersModule, EventsModule]
  })
  .overrideProvider(EventsService)
  .useValue(eventsService)
  .compile();

  app = moduleFixture.createNestApplication();
  await app.init();
 });

 it('/events (POST)', async (done) => {
  return await request(app.getHttpServer())
   .post('/events')
   .send(eventPayload)
   .set('Accept', 'application/json')
   .expect('Content-Type', /json/)
   .expect(201)
   .then(response => {
    expect(response.body.user).toEqual(eventPayload.user);
    expect(response.body.updatedConsents).toEqual(eventPayload.consents);
    done();
   }).catch(err => err);
 });

 afterAll(async () => {
  await app.close();
 });
});
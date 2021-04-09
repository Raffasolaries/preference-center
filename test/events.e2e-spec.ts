import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from './../src/users/users.module';
import { EventsModule } from './../src/events/events.module';
import { EventsService } from './../src/events/events.service';
import { EventDTO } from './../src/events/dto/event.dto';
import { ConsentType } from './../src/events/entities/event.entity';

describe('Events (e2e)', () => {
 let app: INestApplication;
 let eventPayload: EventDTO = {
  user: {
   id: 'placeholder'
  },
  consents: [
   {
    id: ConsentType.email_notifications,
    enabled: true
   },
   {
    id: ConsentType.sms_notifications,
    enabled: true
   }
  ]
 };
 let eventsService = { 
  update: async (dto: EventDTO) => {
   return {
    user: {
     id: 'placeholder'
    },
    updatedConsents: [
     {
      id: ConsentType.email_notifications,
      enabled: true
     },
     {
      id: ConsentType.sms_notifications,
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
  await request(app.getHttpServer())
   .post('/events')
   .send(eventPayload)
   .set('Accept', 'application/json')
   .expect('Content-Type', /json/)
   .expect(201)
   .expect(await eventsService.update(eventPayload));
  return done();
 });

 afterAll(async () => {
  await app.close();
 });
});
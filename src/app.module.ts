import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { configService } from './config/config.service';

@Module({
  imports: [
   UsersModule,
   EventsModule,
   TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
  controllers: [AppController],
  providers: [
   AppService,
   // {
   //   provide: APP_INTERCEPTOR,
   //   useClass: ErrorsInterceptor,
   // }
  ],
})
export class AppModule {}

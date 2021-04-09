import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter());

  if (!configService.isProduction()) {

    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Preference Center APIs')
      .setDescription('Preference Center APIs')
      .setVersion('1.0')
      .build());

    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

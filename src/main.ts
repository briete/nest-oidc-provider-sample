import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import helmet from 'helmet';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('OpenId Connect / OAuth2.0 Authorization Server Sample')
    .setBasePath('sample')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  // app.use(csurf());

  await app.listen(3000);
}
bootstrap();

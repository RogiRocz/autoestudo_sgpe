import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SGPE - Sistema de Gestão Psicológica')
    .setDescription('API para gerenciamento de pacientes e prontuários')
    .setVersion('1.0')
    .addTag('pacientes')
    .addTag('prontuarios')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira seu token JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  app.enableCors({
    origin: [
      'https://ideal-disco-xvpq7wx4q45f494-3000.app.github.dev',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
	exposedHeaders: ['Authorization']
  })

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}/`);
  console.log(`Para acessar o swagger: http://localhost:${process.env.PORT ?? 3000}/api/docs`)
}

bootstrap().then().catch(e => {
  console.log(`Não foi possível subir servidor. Erro: ${e}`)
}) 

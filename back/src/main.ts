import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SGPE - Sistema de Gestão Psicológica')
    .setDescription('API para gerenciamento de pacientes e prontuários')
    .setVersion('1.0')
    .addTag('pacientes')
    .addTag('prontuarios')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}/`);
  console.log(`Para acessar o swagger: https://localhost:${process.env.PORT ?? 3000}/api/docs`)
}

bootstrap().then().catch(e => {
  console.log(`Não foi possível subir servidor. Erro: ${e}`)
}) 

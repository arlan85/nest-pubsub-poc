import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3020);
}
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});

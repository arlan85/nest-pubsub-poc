import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GcpConfig } from './common/config';
import { CloudFunctionService } from './modules/cloud-function';
import { CloudFunctionModule } from './modules/cloud-function/cloud-function.module';
import { PubSubModule } from './modules/pubsub';

@Module({
  imports: [
    CloudFunctionModule,
    PubSubModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [GcpConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CloudFunctionService],
})
export class AppModule {}

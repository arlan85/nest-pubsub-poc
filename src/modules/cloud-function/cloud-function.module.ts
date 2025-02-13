import { Module } from '@nestjs/common';
import { PubSubService } from '../pubsub';
import { CloudFunctionService } from './cloud-function.service';

@Module({
  providers: [CloudFunctionService, PubSubService],
})
export class CloudFunctionModule {}

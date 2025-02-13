import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PubSubService } from '../pubsub';

const topicName = 'nest-poc-todos-v1';

@Injectable()
export class CloudFunctionService {
  constructor(private readonly pubSubService: PubSubService) {}

  @OnEvent('triggerCloudFunction')
  async triggerCloudFunction(event_payload: any) {
    console.log('Cloud function triggered', event_payload);
    try {
      // return await Promise.resolve('OK');
      await this.pubSubService.publishMessage(topicName, event_payload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  }
}

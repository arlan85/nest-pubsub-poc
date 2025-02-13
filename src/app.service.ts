/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PubSubService } from './modules/pubsub/pubsub.service';

@Injectable()
export class AppService {
  constructor(private readonly pubSubService: PubSubService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async Operate(request: Record<string, any>): Promise<any> {
    const topicName = 'nest-poc-todos-v1';

    // Do operation on request and create response payload
    console.log('Request content', JSON.stringify(request));
    const response_payload = { ...request };
    await this.pubSubService.publishMessage(topicName, response_payload);
    // await this.eventEmitter.emitAsync('triggerCloudFunction', response_payload);
    return { response: 'OK' };
  }

  async ReceiveNextProcess(request: Record<string, any>): Promise<any> {
    const {
      message: { data, publishTime, messageId },
    } = request;
    let content;
    try {
      const formattedData = request && Buffer.from(data, 'base64').toString();
      content = JSON.parse(formattedData);
      throw new Error('Error parsing message');
    } catch (error: unknown) {
      console.log('Error parsing message', error);
      if (error instanceof Error) {
        return Promise.reject(
          new Error(
            typeof error.message === 'string'
              ? error.message
              : 'Error parsing message',
          ),
        );
      } else {
        return Promise.reject(new Error('Unknown error'));
      }
    }

    console.log(`content : ${JSON.stringify(content)}!`);
    console.log('response from content', publishTime, messageId);
    return Promise.resolve({ response: 'OK' });
  }
}

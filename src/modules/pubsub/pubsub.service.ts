import { PubSub } from '@google-cloud/pubsub';
import { Injectable } from '@nestjs/common';
import { GcpConfig } from '../../common';

@Injectable()
export class PubSubService {
  private readonly pubSubClient: PubSub;
  private readonly gcpConfig: ReturnType<typeof GcpConfig>;
  constructor() {
    this.gcpConfig = GcpConfig();
    this.pubSubClient = new PubSub({
      projectId: this.gcpConfig.projectId, // Replace with your actual project ID
      keyFilename: this.gcpConfig.keyFile, // Replace with the path to your service account key file
    });
  }

  async publishMessage(topicName: string, data: any): Promise<void> {
    const topic = this.pubSubClient.topic(topicName);
    // const dataBuffer = Buffer.from(JSON.stringify(data));

    try {
      await topic.publishMessage({ json: data });
      console.log(`Message published to topic ${topicName}`);
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }
}

import { registerAs } from '@nestjs/config';

type GcpConfig = {
  projectId: string;
  keyFile: string;
};

export default registerAs(
  'gcp',
  (): GcpConfig => ({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
  }),
);

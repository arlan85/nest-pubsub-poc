import { Test, TestingModule } from '@nestjs/testing';
import { CloudFunctionService } from './cloud-function.service';

describe('CloudFunctionService', () => {
  let service: CloudFunctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudFunctionService],
    }).compile();

    service = module.get<CloudFunctionService>(CloudFunctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

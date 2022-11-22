import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategyService } from './local-strategy.service';

describe('LocalStrategyService', () => {
  let service: LocalStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategyService],
    }).compile();

    service = module.get<LocalStrategyService>(LocalStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

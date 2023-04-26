import { Test, TestingModule } from '@nestjs/testing';
import { DefectCasesResultService } from './defect-cases-result.service';

describe('DefectCasesResultService', () => {
  let service: DefectCasesResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectCasesResultService],
    }).compile();

    service = module.get<DefectCasesResultService>(DefectCasesResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

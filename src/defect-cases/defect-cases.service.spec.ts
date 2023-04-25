import { Test, TestingModule } from '@nestjs/testing';
import { DefectCasesService } from './defect-cases.service';

describe('DefectCasesService', () => {
  let service: DefectCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectCasesService],
    }).compile();

    service = module.get<DefectCasesService>(DefectCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

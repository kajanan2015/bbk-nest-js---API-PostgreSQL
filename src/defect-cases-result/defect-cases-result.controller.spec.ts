import { Test, TestingModule } from '@nestjs/testing';
import { DefectCasesResultController } from './defect-cases-result.controller';
import { DefectCasesResultService } from './defect-cases-result.service';

describe('DefectCasesResultController', () => {
  let controller: DefectCasesResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectCasesResultController],
      providers: [DefectCasesResultService],
    }).compile();

    controller = module.get<DefectCasesResultController>(DefectCasesResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

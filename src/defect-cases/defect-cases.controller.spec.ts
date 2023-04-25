import { Test, TestingModule } from '@nestjs/testing';
import { DefectCasesController } from './defect-cases.controller';
import { DefectCasesService } from './defect-cases.service';

describe('DefectCasesController', () => {
  let controller: DefectCasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectCasesController],
      providers: [DefectCasesService],
    }).compile();

    controller = module.get<DefectCasesController>(DefectCasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

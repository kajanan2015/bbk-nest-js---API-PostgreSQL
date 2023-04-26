import { Test, TestingModule } from '@nestjs/testing';
import { DefectTripController } from './defect-trip.controller';
import { DefectTripService } from './defect-trip.service';

describe('DefectTripController', () => {
  let controller: DefectTripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectTripController],
      providers: [DefectTripService],
    }).compile();

    controller = module.get<DefectTripController>(DefectTripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

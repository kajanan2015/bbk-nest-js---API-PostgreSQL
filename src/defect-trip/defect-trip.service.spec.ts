import { Test, TestingModule } from '@nestjs/testing';
import { DefectTripService } from './defect-trip.service';

describe('DefectTripService', () => {
  let service: DefectTripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectTripService],
    }).compile();

    service = module.get<DefectTripService>(DefectTripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

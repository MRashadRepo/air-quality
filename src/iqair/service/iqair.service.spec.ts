import { Test, TestingModule } from '@nestjs/testing';
import { IqairService } from './iqair.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

describe('IqairService', () => {
  let service: IqairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IqairService, ConfigService, HttpService],
    }).compile();

    service = module.get<IqairService>(IqairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

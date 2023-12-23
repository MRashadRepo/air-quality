import { Test, TestingModule } from '@nestjs/testing';
import { IqairController } from './iqair.controller';
import { IqairService } from '../service/iqair.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

describe('IqairController', () => {
  let controller: IqairController;
  let service: IqairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IqairService, ConfigService, HttpService],
      controllers: [IqairController],
    }).compile();

    controller = module.get<IqairController>(IqairController);
    service = module.get<IqairService>(IqairService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});

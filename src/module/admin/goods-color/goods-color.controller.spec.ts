import { Test, TestingModule } from '@nestjs/testing';
import { GoodsColorController } from './goods-color.controller';

describe('GoodsColor Controller', () => {
  let controller: GoodsColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsColorController],
    }).compile();

    controller = module.get<GoodsColorController>(GoodsColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

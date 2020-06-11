import { Test, TestingModule } from '@nestjs/testing';
import { GoodsAttrController } from './goods-attr.controller';

describe('GoodsAttr Controller', () => {
  let controller: GoodsAttrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsAttrController],
    }).compile();

    controller = module.get<GoodsAttrController>(GoodsAttrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

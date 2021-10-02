import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository
        },
      ]
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
    productController = module.get<ProductsController>(ProductsController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(productController).toBeDefined();
    });
  })

  describe('getAllProducts', () => {
    it('should return array', async () => {
      const results = [];

      jest.spyOn(productService, 'findAllProducts').mockResolvedValue(results);
      expect(await productController.getAllProducts()).toBe(results);
    });
  });
});

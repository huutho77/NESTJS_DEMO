import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../entities/category.entity';

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
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository
        }
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
    it('should be defined', async () => {
      expect(productController.getAllProducts).toBeDefined();
    });

    it('should be called', async () => {
      let spy = jest.spyOn(productController, 'getAllProducts').mockResolvedValue([]);
      productController.getAllProducts();
      expect(spy).toHaveBeenCalled();
    });

    it('should be when throw exception', async () => {
      jest.spyOn(productController, 'getAllProducts');
      return await productController.getAllProducts().catch(err => {
        expect(err).toEqual(TypeError('Cannot read property \'find\' of undefined'));
      });
    });

    it('should return a array', async () => {
      jest.spyOn(productService, 'findAllProducts').mockResolvedValue([]);
      expect(await productController.getAllProducts()).toEqual([]);
    });
  }); // close describe getAllProducts function

  describe('getProductById', () => {
    it('should be defined', async () => {
      expect(productController.getProductById).toBeDefined();
    });
  }); // close describe getAllProducts function

  describe('createNewProduct', () => {
    it('should be defined', async () => {
      expect(productController.createNewProduct).toBeDefined();
    });
  }); // close describe createNewProduct function

  describe('updateProduct', () => {
    it('should be defined', async () => {
      expect(productController.updateProduct).toBeDefined();
    });
  }); // close describe updateProduct function

  describe('deleteItem', () => {
    it('should be defined', async () => {
      expect(productController.deleteItem).toBeDefined();
    });
  }); // close describe deleteItem function

});

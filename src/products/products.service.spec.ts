import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Repository } from "typeorm";
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  // Mock data
  const testCategory: Category = {
    id: '92cf3f15-eeee-462a-b8da-41485c2d6f78',
    name: 'Laptop',
    description: '',
    create_At: new Date(),
    updatee_At: new Date(),
  };

  const testData = [
    {
      id: '25f6b175-f942-4755-8dd5-d4faaa4be3a7',
      name: 'Nguyen Huu Tho test 1',
      quantity: 200,
      price: 100,
      amount_view: 0,
      description: '',
      percent_discount: 0,
      create_At: new Date(),
      update_At: new Date(),
      category: testCategory,
    },
    {
      id: '15177eb7-e174-48ae-a810-7b5a2a7b48df',
      name: 'Nguyen Huu Tho test 2',
      quantity: 200,
      price: 100,
      amount_view: 0,
      description: '',
      percent_discount: 0,
      create_At: new Date(),
      update_At: new Date(),
      category: testCategory,
    },
  ];

  // Mock function and service
  let mockService: ProductsService;
  let mockProductRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository
        },
      ],
    }).compile();

    mockService = module.get<ProductsService>(ProductsService);
    mockProductRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(mockService).toBeDefined();
  });

  describe('findAllProducts', () => {
    it('should be defined', async () => {
      expect(mockService.findAllProducts()).toBeDefined();
    });

    it('shoule return products array', async () => {
      jest.spyOn(mockService, 'findAllProducts');

      mockService.findAllProducts();

      expect(mockService.findAllProducts).toHaveBeenCalled();
    });
  });

  describe('checkChangeData', () => {
    it('should be calleed', () => {
      let newValue = 'Nguyen Huu Tho';
      let oldValue = 'old do not change';

      let spy = jest.spyOn(mockService, 'checkChangeData');

      mockService.checkChangeData(newValue, oldValue);
      expect(spy).toHaveBeenCalled();
    });

    it('should return new value', () => {
      let newValue = 'Nguyen Huu Tho';
      let oldValue = 'old do not change';

      expect(mockService.checkChangeData(oldValue, newValue)).toEqual(newValue);
    });

    it('should return old value when newValue is empty', () => {
      let newValue = '';
      let oldValue = 'Nguyen Huu Tho';

      expect(mockService.checkChangeData(oldValue, newValue)).toEqual(oldValue);
    });

    it('should return old value when newValue is undefined', () => {
      let newValue = undefined;
      let oldValue = 'Nguyen Huu Tho';

      expect(mockService.checkChangeData(oldValue, newValue)).toEqual(oldValue);
    });

    it('should return old value when newValue equal oldValue', () => {
      let newValue = 'Nguyen Huu Tho';
      let oldValue = 'Nguyen Huu Tho';

      expect(mockService.checkChangeData(oldValue, newValue)).toEqual(oldValue);
    });
  });

  describe('findProductById', () => {
    it('should be defined', () => {
      expect(mockService.findProductById).toBeDefined();
    });

    it('should be called', async () => {
      const id = '25f6b175-f942-4755-8dd5-d4faaa4be3a7';

      let findProductByIdSpy = jest.spyOn(mockService, 'findProductById');

      mockService.findProductById(id);

      expect(findProductByIdSpy).toHaveBeenCalled();
      expect(findProductByIdSpy).toHaveBeenCalledWith(id);
    });

    it('should be return error when id not exist', async () => {
      const id = 'e59709cd-7914-4d7c-9e22-f08f2fc72160';

      jest.spyOn(mockProductRepository, 'findOne').mockReturnValue(undefined);

      expect(mockService.findProductById(id)).rejects.toThrow(NotFoundException);
      expect(mockService.findProductById(id)).rejects.toThrow('Product not already exist.');

    });

    it('should be return a product from array', async () => {
      const id = '25f6b175-f942-4755-8dd5-d4faaa4be3a7';

      // Trả về product tại vị trí đầu tiên trong mảng product
      jest.spyOn(mockProductRepository, 'findOne').mockResolvedValue(testData[0]);

      expect((await mockService.findProductById(id)).id).toEqual(testData[0].id);
    });
  });

  describe('deleteProduct', () => {
    it('shoule be defined', () => {
      expect(mockService.deleteProduct).toBeDefined();
    });

    it('shoule be called', () => {
      const id = '25f6b175-f942-4755-8dd5-d4faaa4be3a7';

      jest.spyOn(mockService, 'deleteProduct');
      mockService.deleteProduct(id);

      expect(mockService.deleteProduct).toHaveBeenCalled();
      expect(mockService.deleteProduct).toHaveBeenCalledWith(id);
    });
  });

});

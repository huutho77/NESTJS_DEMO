import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from 'src/dto/product-create.dto';

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
    {
      id: '98c8c1f5-09ab-4105-92ab-212fa7b3d5f4',
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

  describe('findAllProducts function', () => {
    it('should be defined', async () => {
      expect(mockService.findAllProducts).toBeDefined();
    });

    it('should be display error', async () => {
      expect.assertions(1);
      await expect(mockService.findAllProducts()).rejects.toEqual(TypeError('Cannot read property \'find\' of undefined'));
    });

    it('shoule return products array', async () => {
      jest.spyOn(mockProductRepository, 'find').mockResolvedValue(testData);
      expect(await mockService.findAllProducts()).toEqual(testData);
    });
  });

  describe('findProductById function', () => {
    it('should be defined', () => {
      expect(mockService.findProductById).toBeDefined();
    });

    it('should be called', async () => {
      const id = '25f6b175-f942-4755-8dd5-d4faaa4be3a7';
      jest.spyOn(mockService, 'findProductById').mockImplementation(async () => testData[0]);
      mockService.findProductById(id);
      expect(mockService.findProductById).toHaveBeenCalled();
      expect(mockService.findProductById).toHaveBeenCalledWith(id);
    });

    it('should be handle when rejection', async () => {
      let id = '0357b339-1926-4663-bc0d-36f17057e21d';
      return await mockService.findProductById(id).catch(err => {
        expect(err).toEqual(TypeError('Cannot read property \'findOne\' of undefined'));
      });
    });

    it('should return exception and message when product not already exists', async () => {
      const id = 'e59709cd-7914-4d7c-9e22-f08f2fc72160';
      jest.spyOn(mockProductRepository, 'findOne').mockReturnValue(undefined);
      expect(mockService.findProductById(id)).rejects.toThrow(NotFoundException);
      expect(mockService.findProductById(id)).rejects.toThrow('Product not already exist.');
    });

    it('should return a product', async () => {
      const id = '25f6b175-f942-4755-8dd5-d4faaa4be3a7';
      jest.spyOn(mockProductRepository, 'findOne').mockResolvedValueOnce(testData[0]);
      expect((await mockService.findProductById(id)).id).toEqual(testData[0].id);
    });
  });

  describe('checkChangeData function', () => {
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
      let result = mockService.checkChangeData(oldValue, newValue);
      expect(result).toEqual(newValue);
    });

    it('should return old value when newValue is empty', () => {
      let newValue = '';
      let oldValue = 'Nguyen Huu Tho';
      let result = mockService.checkChangeData(oldValue, newValue);
      expect(result).toEqual(oldValue);
    });

    it('should return old value when newValue is undefined', () => {
      let newValue = undefined;
      let oldValue = 'Nguyen Huu Tho';
      let result = mockService.checkChangeData(oldValue, newValue);
      expect(result).toEqual(oldValue);
    });

    it('should return old value when newValue equal oldValue', () => {
      let newValue = 'Nguyen Huu Tho';
      let oldValue = 'Nguyen Huu Tho';
      let result = mockService.checkChangeData(oldValue, newValue);
      expect(result).toEqual(oldValue);
    });
  });

  // describe('deleteProduct', () => {
  //   it('shoule be defined', () => {
  //     expect(mockService.deleteProduct).toBeDefined();
  //   });

  //   it('shoule be called', () => {
  //     const id = '25f6b175-f942-4755-8dd5-d4faaa4be3a7';

  //     jest.spyOn(mockService, 'deleteProduct');
  //     mockService.deleteProduct(id);

  //     expect(mockService.deleteProduct).toHaveBeenCalled();
  //     expect(mockService.deleteProduct).toHaveBeenCalledWith(id);
  //   });

  //   it('should return length of array is 1', async () => {
  //     const testProduct: Product = {
  //       id: '98c8c1f5-09ab-4105-92ab-212fa7b3d5f4',
  //       name: 'Nguyen Huu Tho test 2',
  //       quantity: 200,
  //       price: 100,
  //       amount_view: 0,
  //       description: '',
  //       percent_discount: 0,
  //       create_At: new Date(),
  //       update_At: new Date(),
  //       category: testCategory,
  //     };

  //     let testArray = [
  //       {
  //         id: '90cc6eec-b1af-4713-8cd6-bd199b765a3e',
  //         name: 'Nguyen Huu Tho test 2',
  //         quantity: 200,
  //         price: 100,
  //         amount_view: 0,
  //         description: '',
  //         percent_discount: 0,
  //         create_At: new Date(),
  //         update_At: new Date(),
  //         category: testCategory,
  //       }
  //     ];

  //     jest.spyOn(mockService, 'findProductById').mockResolvedValue(testProduct);
  //     jest.spyOn(mockProductRepository, 'remove').mockResolvedValue(testProduct);
  //     jest.spyOn(mockService, 'findAllProducts').mockResolvedValue(testArray);

  //     await mockService.deleteProduct(testProduct.id);

  //     expect(mockService.findProductById).toHaveBeenCalledWith(testProduct.id);
  //     expect(mockService.findAllProducts).toHaveBeenCalled();
  //   });
  // });

  // describe('createNewProduct', () => {
  //   it('should be defined', () => {
  //     expect(mockService.createNewProduct).toBeDefined();
  //   });

  //   it('should be called', async () => {
  //     let newProduct: CreateProductDTO;

  //     jest.spyOn(mockService, 'createNewProduct');

  //     mockService.createNewProduct(newProduct);

  //     expect(mockService.createNewProduct).toHaveBeenCalled();
  //     expect(mockService.createNewProduct).toHaveBeenCalledWith(newProduct);
  //   });

  // });

});

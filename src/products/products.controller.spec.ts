import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../entities/category.entity';
import { CreateProductDTO } from '../dto/product-create.dto';

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  let mockCategory: Category = {
    id: '1940afa5-01ad-459b-8151-b54b5319a682',
    name: 'Laptop',
    description: 'Máy tính xách tay',
    create_At: new Date(2021, 10, 14, 0, 0, 0),
    updatee_At: new Date(2021, 10, 14, 0, 0, 0)
  }
  let mockProduct: Product = {
    id: 'be63ef19-5831-4406-8d0b-66d5871be864',
    name: '',
    quantity: 100,
    price: 100000000,
    percent_discount: 0,
    amount_view: 0,
    description: 'Hàng nhập khẩu thương mại - Thị trường Singapore',
    create_At: new Date(),
    update_At: new Date(),
    category: mockCategory
  };

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

    it('should be called', async () => {
      let id = 'be63ef19-5831-4406-8d0b-66d5871be864';
      jest.spyOn(productController, 'getProductById').mockResolvedValue(mockProduct);
      productController.getProductById(id);
      expect(productController.getProductById).toHaveBeenCalledWith(id);
    });

    it('should be when throw exception', async () => {
      let id = '7726472f-1cb7-40cb-8157-b0e270c034b9';
      jest.spyOn(productController, 'getProductById');
      return await productController.getProductById(id).catch(err => {
        expect(err).toEqual(TypeError('Cannot read property \'findOne\' of undefined'));
      });
    });

    it('should return a product', async () => {
      jest.spyOn(productService, 'findProductById').mockResolvedValue(mockProduct);
      expect(await productController.getProductById('be63ef19-5831-4406-8d0b-66d5871be864')).toEqual(mockProduct);
    });
  }); // close describe getAllProducts function

  describe('createNewProduct', () => {
    it('should be defined', async () => {
      expect(productController.createNewProduct).toBeDefined();
    });

    it('should be called', async () => {
      let mockProductDTO: CreateProductDTO = {
        name: 'Sản phẩm mẫu',
        quantity: 100,
        price: 1000000,
        description: 'Sản phẩm test',
        categoryId: '1940afa5-01ad-459b-8151-b54b5319a682'
      };

      jest.spyOn(productController, 'createNewProduct').mockResolvedValue(mockProduct);
      productController.createNewProduct(mockProductDTO);
      expect(productController.createNewProduct).toHaveBeenCalledWith(mockProductDTO);
    });

    it('should return new product information', async () => {
      let mockProductDTO: CreateProductDTO = {
        name: 'Sản phẩm mẫu',
        quantity: 100,
        price: 1000000,
        description: 'Sản phẩm test',
        categoryId: '1940afa5-01ad-459b-8151-b54b5319a682'
      };

      let mockNewProduct: Product = {
        id: '37a67c23-2e25-45cf-af6a-5515b991a702',
        name: 'Sản phẩm mẫu',
        quantity: 100,
        price: 1000000,
        description: 'Sản phẩm test',
        percent_discount: 0,
        amount_view: 0,
        create_At: new Date(),
        update_At: new Date(),
        category: mockCategory
      };

      jest.spyOn(productService, 'createNewProduct').mockResolvedValue(mockNewProduct);
      expect(await productController.createNewProduct(mockProductDTO)).toEqual(mockNewProduct);
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

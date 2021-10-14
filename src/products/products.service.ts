import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateProductDTO } from '../dto/product-create.dto';
import { UpdateProductDTO } from '../dto/product-update.dto';
import { Product } from '../entities/product.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoryService: CategoriesService) { }

  async findAllProducts(): Promise<Product[]> {
    return (await this.productRepository.find()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ id });
    if (!product) { throw new NotFoundException('Product not already exist.'); }
    return product;
  }

  async createNewProduct(newProduct: CreateProductDTO): Promise<Product> {
    let { name, quantity, price, description, categoryId } = newProduct;
    let id = uuidv4();

    // Check product exists
    if (await this.productRepository.findOne({ name })) {
      throw new ConflictException('Product is already exists.');
    }

    let product = this.productRepository.create({
      id,
      name,
      quantity,
      price,
      percent_discount: 0,
      description,
      amount_view: 0,
      create_At: new Date(),
      update_At: new Date(),
      category: await this.categoryService.findCategoryById(categoryId)
    });

    return product;
  }

  async updateProduct(id: string, dataChange: UpdateProductDTO): Promise<Product> {
    let product = await this.findProductById(id);
    let productChanged = await this.checkAndChange(product, dataChange);

    await this.productRepository.update(id, productChanged);
    return product;
  }

  async deleteProduct(id: string) {
    if (!await this.productRepository.findOne(id)) { throw new NotFoundException('Product not alreadt exist'); }
    return await this.productRepository.delete(id);
  }

  async checkAndChange(currentProduct: Product, newValue: UpdateProductDTO): Promise<Object> {
    let results = {};
    let category = await this.categoryService.findCategoryById(newValue.categoryId);

    for (const key in newValue) {
      if (newValue[key] !== "" && currentProduct[key] !== newValue[key] && key !== 'categoryId') {
        results[key] = newValue[key];
      } else if (newValue[key] !== currentProduct[key]) {
        results['category'] = category;
      }
    }
    results['update_At'] = new Date();

    return results;
  }
}

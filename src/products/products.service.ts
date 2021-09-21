import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  findAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProductById(id: number): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOneOrFail({ id });
      return product;
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  createNewProduct(newProduct: CreateProductDTO): Promise<Product> {
    let product: Product = this.productRepository.create(newProduct);

    product.create_At = new Date(Date.now());
    product.update_At = new Date(Date.now());

    return this.productRepository.save(product);
  }

  async updateProduct(id: number, dataChange: UpdateProductDTO): Promise<Product> {
    let updateProduct = await this.findProductById(id);
    console.log("Before update: ", updateProduct);

    updateProduct.name = this.checkChangeData(updateProduct.name, dataChange.name);
    updateProduct.quantity = this.checkChangeData(updateProduct.quantity, dataChange.quantity);
    updateProduct.price = this.checkChangeData(updateProduct.price, dataChange.price);
    updateProduct.description = this.checkChangeData(updateProduct.description, dataChange.description);
    updateProduct.create_At = this.checkChangeData(updateProduct.create_At, dataChange.create_At);
    updateProduct.update_At = new Date();

    console.log("After update: ", updateProduct);

    return this.productRepository.save(updateProduct);
  }

  async deleteProduct(id: number) {
    let productDelete = await this.findProductById(id);
    this.productRepository.remove(productDelete);
    return await this.findAllProducts();
  }

  private checkChangeData(oldValue: any, newValue: any): any {
    if (!newValue) { return oldValue; }

    if (oldValue !== newValue) {
      return newValue;
    }
    else {
      return oldValue;
    }
  }
}

import { Body, Controller, Get, Post, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDTO } from '../dto/product-create.dto';
import { UpdateProductDTO } from '../dto/product-update.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    let product = await this.productService.findProductById(id);
    return product;
  }

  @Post('create')
  async createNewProduct(@Body() body: CreateProductDTO) {
    return await this.productService.createNewProduct(body);
  }

  @Put('update/:id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return await this.productService.updateProduct(id, body);
  }

  @Delete('delete/:id')
  async deleteItem(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}

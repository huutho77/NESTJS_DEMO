import { Body, Controller, Get, Post, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDTO } from '../dto/product-create.dto';
import { UpdateProductDTO } from '../dto/product-update.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    let product = this.productService.findProductById(id);
    return product;
  }

  @Post('create')
  createNewProduct(@Body() body: CreateProductDTO) {
    return this.productService.createNewProduct(body);
  }

  @Put('update/:id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return this.productService.updateProduct(id, body);
  }

  @Delete('delete/:id')
  deleteItem(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}

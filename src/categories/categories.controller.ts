import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDTO } from '../dto/category-create.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @Get()
  async getAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Post('create')
  async createNewCategory(@Body() body: CreateCategoryDTO) {
    return await this.categoriesService.createCategory(body);
  }

  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(id);
  }
}

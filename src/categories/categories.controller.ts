import { Body, Controller, Get, Post } from '@nestjs/common';
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
  createNewCategory(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.createCategory(body);
  }
}

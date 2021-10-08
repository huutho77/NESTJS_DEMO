import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Any, Repository } from 'typeorm';
import { CreateCategoryDTO } from 'src/dto/category-create.dto';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findCategoryById(id: string): Promise<Category> {
    let category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not already existing');
    }
    return category;
  }

  async createCategory(newCategory: CreateCategoryDTO): Promise<Category> {
    let { name, description } = newCategory;

    // Check existing
    if (await this.categoryRepository.findOne({ name })) {
      throw new BadRequestException('Category already existing');
    }

    let id = uuidv4();
    let category = this.categoryRepository.create({
      id,
      name,
      description,
      create_At: new Date(),
      updatee_At: new Date()
    });

    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: string) {
    if (!await this.categoryRepository.findOne(id)) {
      throw new BadRequestException('Product not already existing.')
    }
    return await this.categoryRepository.delete(id);
  }
}

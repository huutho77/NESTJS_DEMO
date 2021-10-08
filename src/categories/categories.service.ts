import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from 'src/dto/category-create.dto';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  createCategory(newCategory: CreateCategoryDTO) {
    let { name, description, createAt, updateAt } = newCategory;
    let id = uuidv4();

    let category: Category = {
      id: id,
      name,
      description,
      create_At: createAt || new Date(),
      updatee_At: updateAt || new Date()
    };

    return category;
  }
}

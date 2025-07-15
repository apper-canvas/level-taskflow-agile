import categoriesData from "@/services/mockData/categories.json";
import { taskService } from "./taskService";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await this.delay();
    // Update task counts dynamically
    const tasks = await taskService.getAll();
    return this.categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.categoryId === category.Id).length
    }));
  }

  async getById(id) {
    await this.delay();
    return this.categories.find(category => category.Id === id) || null;
  }

  async create(categoryData) {
    await this.delay();
    const newCategory = {
      Id: this.getNextId(),
      ...categoryData,
      taskCount: 0
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await this.delay();
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...categoryData
    };
    return { ...this.categories[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.categories.map(category => category.Id), 0) + 1;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}

export const categoryService = new CategoryService();
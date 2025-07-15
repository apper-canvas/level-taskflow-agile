import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    return this.tasks.find(task => task.Id === id) || null;
  }

  async create(taskData) {
    await this.delay();
    const newTask = {
      Id: this.getNextId(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, taskData) {
    await this.delay();
    const index = this.tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...taskData
    };
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks.splice(index, 1);
    return true;
  }

  async getByCategory(categoryId) {
    await this.delay();
    return this.tasks.filter(task => task.categoryId === categoryId);
  }

  async getByStatus(completed) {
    await this.delay();
    return this.tasks.filter(task => task.completed === completed);
  }

  getNextId() {
    return Math.max(...this.tasks.map(task => task.Id), 0) + 1;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export const taskService = new TaskService();
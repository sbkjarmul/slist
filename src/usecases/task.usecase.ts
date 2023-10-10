import TaskAPI, { ITaskAPI } from "@/infrastructure/task.api";
import { TaskModel } from "@/models/task.model";

export interface ITaskUseCase {
  fetchTasks: () => Promise<TaskModel[]>;
  createTask: (title: string) => Promise<TaskModel>;
  updateTask: (task: TaskModel) => Promise<TaskModel>;
  deleteTask: (id: number) => Promise<number>;
}

export class TaskUseCase {
  constructor(private readonly taskAPI: ITaskAPI) {}

  async fetchTasks() {
    const tasks = await this.taskAPI.fetchTasks();
    return tasks;
  }

  async createTask(title: string) {
    const newTask = await this.taskAPI.create(title);
    return newTask;
  }

  async updateTask(task: TaskModel) {
    const updatedTask = await this.taskAPI.update(task);
    return updatedTask;
  }

  async deleteTask(id: number) {
    const deletedTask = await this.taskAPI.delete(id);
    return deletedTask;
  }
}

export default new TaskUseCase(new TaskAPI());

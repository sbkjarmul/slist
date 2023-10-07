import TaskAPI, { ITaskAPI } from "@/infrastructure/task.api";
import { TaskModel } from "@/models/task.model";

class TaskUseCase {
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

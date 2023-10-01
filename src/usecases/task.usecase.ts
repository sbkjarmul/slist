import TaskAPI, { ITaskAPI } from "../infrastructure/task.api";
import { TaskStatus } from "../models/task.model";

class TaskUseCase {
  constructor(private readonly taskAPI: ITaskAPI) {}
  async fetchTasks() {
    const tasks = await this.taskAPI.fetchAll();
    return tasks;
  }

  async createTask(title: string) {
    const newTask = await this.taskAPI.create(title);
    return newTask;
  }

  async markTaskAsDone(id: number) {
    const updatedTask = await this.taskAPI.changeStatus(id, TaskStatus.DONE);
    return updatedTask;
  }

  async markTaskAsOpened(id: number) {
    const updatedTask = await this.taskAPI.changeStatus(id, TaskStatus.OPEN);
    return updatedTask;
  }
}

export default new TaskUseCase(new TaskAPI());

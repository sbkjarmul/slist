import { TaskStatus } from "@/enums/task.enum";
import { TaskModel } from "@/models/task.model";

export interface ITaskAPI {
  fetchTasks: () => Promise<TaskModel[]>;
  changeStatus: (id: number, status: TaskStatus) => Promise<TaskModel>;
  create: (title: string) => Promise<TaskModel>;
  delete: (id: number) => Promise<number>;
  update: (task: TaskModel) => Promise<TaskModel>;
}

const mockTasks: TaskModel[] = [
  {
    id: generateID(),
    title: "Learn TypeScript",
    description: "Learn TypeScript for better coding experience",
    status: TaskStatus.OPEN,
  },
  {
    id: generateID(),
    title: "Learn Clean Architecture",
    description: "Learn Clean Architecture for better software design",
    status: TaskStatus.DONE,
  },
  {
    id: generateID(),
    title: "Learn React",
    description: "Learn React for better front-end development",
    status: TaskStatus.CREATED,
  },
  {
    id: generateID(),
    title: "Learn Vue",
    description: "Learn Vue for better front-end development",
    status: TaskStatus.OPEN,
  },
  {
    id: generateID(),
    title: "Learn Angular",
    description: "Learn Angular for better front-end development",
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: generateID(),
    title: "Learn Next",
    description: "Learn Next for better front-end development",
    status: TaskStatus.DONE,
  },
  {
    id: generateID(),
    title: "Learn Nuxt",
    description: "Learn Nuxt for better front-end development",
    status: TaskStatus.CREATED,
  },
];

export function generateID(): number {
  return Math.floor(Math.random() * 1000000);
}

class TaskAPI implements ITaskAPI {
  fetchTasks() {
    return Promise.resolve(mockTasks);
  }

  create(title: string): Promise<TaskModel> {
    const newTask: TaskModel = {
      id: mockTasks.length + 1,
      title,
      description: "",
      status: TaskStatus.CREATED,
    };
    mockTasks.push(newTask);
    return Promise.resolve(newTask);
  }

  update(task: TaskModel): Promise<TaskModel> {
    const taskIndex = mockTasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = task;
    }
    return Promise.resolve(task);
  }

  delete(taskId: number): Promise<number> {
    const taskIndex = mockTasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      mockTasks.splice(taskIndex, 1);
    }
    return Promise.resolve(taskId);
  }

  changeStatus(id: number, status: TaskStatus): Promise<TaskModel> {
    const taskIndex = mockTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      mockTasks[taskIndex].status = status;
    }
    return Promise.resolve(mockTasks[taskIndex]);
  }
}

export default TaskAPI;

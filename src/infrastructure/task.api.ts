import { TaskModel, TaskStatus } from "../models/task.model";

export interface ITaskAPI {
  fetchAll: () => Promise<TaskModel[]>;
  changeStatus: (id: number, status: TaskStatus) => Promise<TaskModel>;
}

const mockTasks: TaskModel[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    description: "Learn TypeScript for better coding experience",
    status: TaskStatus.OPEN,
  },
  {
    id: 2,
    title: "Learn Clean Architecture",
    description: "Learn Clean Architecture for better software design",
    status: TaskStatus.DONE,
  },
  {
    id: 3,
    title: "Learn React",
    description: "Learn React for better front-end development",
    status: TaskStatus.CREATED,
  },
  {
    id: 4,
    title: "Learn Vue",
    description: "Learn Vue for better front-end development",
    status: TaskStatus.OPEN,
  },
  {
    id: 5,
    title: "Learn Angular",
    description: "Learn Angular for better front-end development",
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 6,
    title: "Learn Next",
    description: "Learn Next for better front-end development",
    status: TaskStatus.DONE,
  },
  {
    id: 7,
    title: "Learn Nuxt",
    description: "Learn Nuxt for better front-end development",
    status: TaskStatus.CREATED,
  },
];

class TaskAPI {
  fetchAll() {
    return Promise.resolve(mockTasks);
  }

  changeStatus(id: number, status: TaskStatus) {
    const taskIndex = mockTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      mockTasks[taskIndex].status = status;
    }
    return Promise.resolve(mockTasks[taskIndex]);
  }
}

export default TaskAPI;

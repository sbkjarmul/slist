import { TaskStatus } from "@/enums/task.enum";

export interface TaskModel {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface ColumnModel {
  id: number;
  title: TaskStatus;
  tasks: TaskModel[];
}

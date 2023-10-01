export interface TaskModel {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  CREATED = "CREATED",
  OPEN = "OPEN",
  IN_PROGRESS = "IN PROGRESS",
  DONE = "DONE",
}

export interface ColumnModel {
  id: number;
  title: string;
  tasks: TaskModel[];
}

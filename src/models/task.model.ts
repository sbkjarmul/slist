export interface TaskModel {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  CREATED = "CREATED",
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

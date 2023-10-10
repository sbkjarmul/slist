import { TaskStatus } from "@/enums/task.enum";
import { ColumnModel, TaskModel } from "@/models/task.model";

export const task: TaskModel = {
  id: 1222,
  title: "Task 1",
  description: "Description 1",
  status: TaskStatus.CREATED,
};

export const task2: TaskModel = {
  id: 2222,
  title: "Task 2",
  description: "Description 2",
  status: TaskStatus.IN_PROGRESS,
};

export const tasks: TaskModel[] = [task, task2];

export const column: ColumnModel = {
  id: 1,
  title: TaskStatus.CREATED,
  tasks: [task],
};

import { TaskStatus } from "@/enums/task.enum";
import { TaskModel, ColumnModel } from "@/models/task.model";
import { DragStartEvent } from "@dnd-kit/core";

export const getTypeFromDragStartEvent = (event: DragStartEvent): string =>
  event.active.data.current?.type;

export const getCurrentFromDragStartEvent = (event: DragStartEvent) =>
  event.active.data.current;

export const getTaskFromDragStartEvent = (event: DragStartEvent) =>
  event.active.data.current?.task;

export const getColumnFromDragStartEvent = (event: DragStartEvent) =>
  event.active.data.current?.column;

export const generateColumns = (tasks: TaskModel[]): ColumnModel[] => [
  {
    id: 1,
    title: TaskStatus.CREATED,
    tasks: tasks.filter(
      (task: TaskModel) => task.status === TaskStatus.CREATED
    ),
  },
  {
    id: 2,
    title: TaskStatus.OPEN,
    tasks: tasks.filter((task: TaskModel) => task.status === TaskStatus.OPEN),
  },
  {
    id: 3,
    title: TaskStatus.IN_PROGRESS,
    tasks: tasks.filter(
      (task: TaskModel) => task.status === TaskStatus.IN_PROGRESS
    ),
  },
  {
    id: 4,
    title: TaskStatus.DONE,
    tasks: tasks.filter((task: TaskModel) => task.status === TaskStatus.DONE),
  },
];

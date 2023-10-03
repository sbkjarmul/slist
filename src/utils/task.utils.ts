import { DragStartEvent } from "@dnd-kit/core";

export enum DraggableItemEnum {
  COLUMN = "column",
  TASK = "task",
}

export const getTypeFromDragStartEvent = (event: DragStartEvent): string =>
  event.active.data.current?.type;

export const getCurrentFromDragStartEvent = (event: DragStartEvent) =>
  event.active.data.current;

export const getTaskFromDragStartEvent = (event: DragStartEvent) =>
  event.active.data.current?.task;

export const getColumnFromDragStartEvent = (event: DragStartEvent) =>
  event.active.data.current?.column;

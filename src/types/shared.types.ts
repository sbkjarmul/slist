import { TaskModel } from "@/models/task.model";
import { MouseEvent, FocusEvent } from "react";

export type InputElement = HTMLTextAreaElement | HTMLInputElement;

export type TaskBlurEvent = FocusEvent<InputElement> | MouseEvent<HTMLElement>;

export type Column = {
  id: number;
  title: string;
  tasks: TaskModel[];
};

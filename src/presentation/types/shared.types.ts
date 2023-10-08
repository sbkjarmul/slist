import { MouseEvent, FocusEvent } from "react";

export type InputElement = HTMLTextAreaElement | HTMLInputElement;

export type TaskBlurEvent = FocusEvent<InputElement> | MouseEvent<HTMLElement>;

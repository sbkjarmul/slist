import { FormEvent } from "react";
import { InputElement } from "../types/shared.types";

export function generateID(): number {
  return Math.floor(Math.random() * 1000000);
}

export function setCursorOnEnd(e: FormEvent) {
  const target = e.target as InputElement;
  const { value } = target;
  target.value = "";
  target.value = value;
}

export function getValueFromEvent(e: FormEvent) {
  const target = e.target as InputElement;
  return target.value;
}

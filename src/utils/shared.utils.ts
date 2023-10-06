import { FormEvent } from "react";

export function generateID(): number {
  return Math.floor(Math.random() * 1000000);
}

export function setCursorOnEnd(e: FormEvent) {
  const target = e.target as HTMLTextAreaElement | HTMLInputElement;
  const { value } = target;
  target.value = "";
  target.value = value;
}

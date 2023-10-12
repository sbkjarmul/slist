import { KeyboardKeysEnum } from "@/enums/shared.enum";
import { InputElement, TaskBlurEvent } from "@/presentation/types/shared.types";
import { KeyboardEvent, FormEvent } from "react";
import "./Input.scss";

export enum InputTypeEnum {
  TEXT = "text",
  MULTI = "multi",
  EMAIL = "email",
  PASSWORD = "password",
}

export type InputType =
  | InputTypeEnum.TEXT
  | InputTypeEnum.MULTI
  | InputTypeEnum.EMAIL
  | InputTypeEnum.PASSWORD;

export interface InputProps {
  value: string;
  onChange: (event: FormEvent) => void;
  onEnter: (event: KeyboardEvent) => void;
  onBlur: (event: TaskBlurEvent) => void;
  onFocus?: (event: FormEvent) => void;
  ref?: React.RefObject<InputElement>;
  type?: InputType;
  placeholder?: string;
}

const Input = ({
  value,
  onChange,
  onEnter,
  onBlur,
  onFocus,
  ref,
  placeholder,
  type = InputTypeEnum.TEXT,
}: InputProps) => {
  const handleOnEnter = (event: KeyboardEvent) => {
    if (event.key === KeyboardKeysEnum.ENTER) {
      onEnter(event);
    }
  };

  if (type === InputTypeEnum.MULTI) {
    return (
      <textarea
        className="multi"
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onKeyDown={handleOnEnter}
        onChange={onChange}
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        onFocus={onFocus}
      />
    );
  }

  return (
    <input
      className="single"
      type={type}
      value={value}
      onKeyDown={handleOnEnter}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      ref={ref as React.RefObject<HTMLInputElement>}
      placeholder={placeholder}
    />
  );
};

export default Input;

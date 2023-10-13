import { KeyboardEvent, FormEvent } from "react";
import { KeyboardKeysEnum } from "@/enums/shared.enum";
import { InputElement, TaskBlurEvent } from "@/presentation/types/shared.types";
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
  onEnter?: (event: KeyboardEvent) => void;
  onBlur?: (event: TaskBlurEvent) => void;
  onFocus?: (event: FormEvent) => void;
  innerRef?: React.RefObject<InputElement>;
  type?: InputType;
  placeholder?: string;
  isError?: boolean;
}

const Input = ({
  value,
  onChange,
  onEnter = () => {},
  onBlur = () => {},
  onFocus,
  innerRef,
  placeholder,
  type = InputTypeEnum.TEXT,
  isError = false,
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
        ref={innerRef as React.RefObject<HTMLTextAreaElement>}
        onFocus={onFocus}
      />
    );
  }

  return (
    <input
      className={`single ${isError ? "single--error" : ""}`}
      type={type}
      value={value}
      onKeyDown={handleOnEnter}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      ref={innerRef as React.RefObject<HTMLInputElement>}
      placeholder={placeholder}
      autoFocus
    />
  );
};

export default Input;

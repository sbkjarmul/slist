import "./Button.scss";

export enum ButtonTypeEnum {
  NORMAL = "normal",
  TRANSPARENT = "transparent",
}

type ButtonType = "normal" | "transparent";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: ButtonType;
}

const Button = ({
  children,
  onClick,
  type = ButtonTypeEnum.NORMAL,
}: ButtonProps) => {
  return (
    <button className={`button button--${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

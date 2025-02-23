import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  handleClick?: () => void;
  isDisabled?: boolean;
  type?: "submit" | "button";
}

const Button: FC<ButtonProps> = ({
  children,
  isDisabled = false,
  handleClick,
  type = "submit",
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={isDisabled}
      className="bg-white border-2 border-primary cursor-pointer text-primary p-2 px-6 rounded text-base font-semibold hover:bg-primary hover:text-white disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;

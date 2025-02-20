import { FC, ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
}

const ErrorMessage: FC<ErrorProps> = ({ children }) => {
  return (
    <span className="text-sm text-red-500 font-semibold italic">
      {children}
    </span>
  );
};

export default ErrorMessage;

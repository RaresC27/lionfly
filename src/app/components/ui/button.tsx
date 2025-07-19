import React from "react";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "transition-colors font-medium px-4 py-2 rounded-xl",
        {
          "bg-[#f45c3c] text-white hover:bg-[#f75d39]": variant === "default",
          "border border-[#f45c3c] text-[#f45c3c] hover:bg-[#f75d39] hover:text-white":
            variant === "outline",
        },
        className
      )}
    />
  );
};

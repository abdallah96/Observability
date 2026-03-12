export type ButtonVariant = "primary" | "secondary" | "tertiary" | string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "small" | "medium" | "large" | string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const Button = ({
  children,
  className,
  isActive,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer ${className} ${isActive ? "observatory-pill-danger" : "observatory-chip"}`}
      {...props}
    >
      {children}
    </button>
  );
};

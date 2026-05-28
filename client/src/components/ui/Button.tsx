type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

// Component or helper function.
function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`w-full rounded-2xl border border-border bg-surface px-6 py-3 text-sm font-medium text-text-dim transition hover:border-primary hover:text-text ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

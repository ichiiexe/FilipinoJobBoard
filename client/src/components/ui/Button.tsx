type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition"
    >
      {children}
    </button>
  );
}

export default Button;

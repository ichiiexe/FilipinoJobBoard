type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
    >
      {children}
    </button>
  );
}

export default Button;

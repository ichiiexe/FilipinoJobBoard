type InputFieldProps = {
  name?: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

// Component or helper function.
function InputField({
  name,
  placeholder,
  type,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <input
      name={name}
      className="w-full rounded-xl border border-border bg-input px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default InputField;

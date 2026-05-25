type InputFieldProps = {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

function InputField({ placeholder, type, value, onChange }: InputFieldProps) {
  return (
    <input
      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default InputField;

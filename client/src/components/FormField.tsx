import InputField from "./InputField";

type FormFieldProps = {
  label: string;
  required?: boolean;
  placeholder: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function FormField({
  label,
  required,
  placeholder,
  type,
  value,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">
        {label}

        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <InputField
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default FormField;

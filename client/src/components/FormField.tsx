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
    <div className="flex flex-col gap-2 text-text">
      <label className="font-medium">
        {label}

        {required && <span className="text-danger  ml-1">*</span>}
      </label>

      <InputField
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />

      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
}

export default FormField;

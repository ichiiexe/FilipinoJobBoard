import InputField from "./InputField";

type Option = {
  value: string;
  label: string;
};

type FormFieldProps = {
  label: string;
  name?: string;
  required?: boolean;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  options?: Array<string | Option>;
  rows?: number;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

// Component or helper function.
function FormField({
  label,
  name,
  required,
  placeholder,
  type = "text",
  as = "input",
  options = [],
  rows = 4,
  value,
  error,
  onChange,
}: FormFieldProps) {
  const renderSelectOptions = () =>
    options.map((option) => {
      if (typeof option === "string") {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      }

      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });

  return (
    <div className="flex flex-col gap-2 text-text">
      <label className="font-medium">
        {label}

        {required && <span className="text-danger ml-1">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-input px-4 py-3 text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
        />
      ) : as === "select" ? (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-input px-4 py-3 text-text outline-none transition focus:border-primary"
        >
          {renderSelectOptions()}
        </select>
      ) : (
        <InputField
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}

      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
}

export default FormField;

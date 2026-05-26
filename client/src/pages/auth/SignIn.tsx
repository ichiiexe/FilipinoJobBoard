import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Button from "../../components/ui/Button";
import FormField from "../../components/FormField";

export default function SignIn() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateStep1 = () => {
    let newErrors = {
      email: "",
      password: "",
    };
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    console.log(field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="flex items-center justify-center text-text">
      <div className="w-[clamp(300px,50%,800px)] h-180 flex flex-col">
        {/* HEADER */}
        <div className="text-center shrink-0 mb-6">
          <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>

          <p className="text-lg text-gray-500">
            Enter your details to access your account and continue exploring job
            opportunities.
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex-1 w-full max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col gap-3"
            >
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <FormField
                    label="Email"
                    required
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={(v) => handleChange("email", v)}
                  />

                  <FormField
                    label="Password"
                    required
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    error={errors.password}
                    onChange={(v) => handleChange("password", v)}
                  />

                  <Button
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                  >
                    Continue
                  </Button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Button from "../../components/ui/Button";
import FormField from "../../components/FormField";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      error: "",
    }));
  };

  const handleSubmit = async () => {
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        error: "Invalid email or password. Please try again.",
      }));
    }
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col gap-3"
            >
              <FormField
                label="Email"
                required
                placeholder="Email"
                type="email"
                value={formData.email}
                error={formData.error}
                onChange={(v) => handleChange("email", v)}
              />

              <FormField
                label="Password"
                required
                placeholder="Password"
                type="password"
                value={formData.password}
                error={formData.error}
                onChange={(v) => handleChange("password", v)}
              />

              <Button onClick={() => handleSubmit()}>Sign In</Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

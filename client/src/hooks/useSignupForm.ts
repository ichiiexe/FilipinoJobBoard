import { useState } from "react";

// Hook for managing multi-step signup form state and validation.
export const useSignupForm = () => {
// Local React state.
  const [step, setStep] = useState(1);

// Local React state.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    bio: "",
    skills: "",
    experience: "",
    resumeLink: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update a single field and clear any existing error for that field.
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validate the account credentials step.
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Validate the personal details step.
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Validate the contact info step.
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    step,
    setStep,
    formData,
    errors,
    handleChange,
    validateStep1,
    validateStep2,
    validateStep3,
  };
};

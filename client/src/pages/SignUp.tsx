import { motion, AnimatePresence } from "framer-motion";
import FormField from "../components/FormField";
import StepIndicator from "../components/StepIndicator";
import { useSignupForm } from "../hooks/useSignupForm";

function SignUp() {
  const {
    step,
    setStep,
    formData,
    errors,
    handleChange,
    validateStep1,
    validateStep2,
    validateStep3,
  } = useSignupForm();

  const handleSubmit = () => {
    if (!validateStep3()) return;

    console.log(formData);
    alert("Signup Complete!");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100 p-4">
      <div className="w-[clamp(300px, 50%, 800px)] h-180 p-8 flex flex-col">
        {/* HEADER */}
        <div className="text-center shrink-0 mb-6">
          <h1 className="text-5xl font-bold mb-4">Let's Get Started!</h1>

          <p className="text-lg text-gray-500">
            Enter your details to create an account and start exploring job
            opportunities.
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="shrink-0 mb-6">
          <StepIndicator step={step} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col gap-2"
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

                  <FormField
                    label="Confirm Password"
                    required
                    placeholder="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={(v) => handleChange("confirmPassword", v)}
                  />

                  <button
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                  >
                    Continue
                  </button>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <h1 className="text-3xl font-bold">Personal Details</h1>

                  <FormField
                    label="First Name"
                    required
                    placeholder="First Name"
                    type="text"
                    value={formData.firstName}
                    error={errors.firstName}
                    onChange={(v) => handleChange("firstName", v)}
                  />

                  <FormField
                    label="Last Name"
                    required
                    placeholder="Last Name"
                    type="text"
                    value={formData.lastName}
                    error={errors.lastName}
                    onChange={(v) => handleChange("lastName", v)}
                  />

                  <FormField
                    label="Skills"
                    required
                    placeholder="Skills"
                    type="text"
                    value={formData.skills}
                    error={errors.skills}
                    onChange={(v) => handleChange("skills", v)}
                  />
                  <p className="text-sm text-gray-500">
                    Note: Please separate your skills with commas.
                  </p>

                  <FormField
                    label="Bio"
                    placeholder="Bio"
                    type="text"
                    value={formData.bio}
                    onChange={(v) => handleChange("bio", v)}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="w-full border py-3 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      onClick={() => {
                        if (validateStep2()) setStep(3);
                      }}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h1 className="text-3xl font-bold">Almost There!</h1>

                  <FormField
                    label="Phone Number"
                    required
                    placeholder="Phone Number"
                    type="number"
                    value={formData.phoneNumber}
                    error={errors.phoneNumber}
                    onChange={(v) => handleChange("phoneNumber", v)}
                  />

                  <FormField
                    label="Address"
                    required
                    placeholder="Address"
                    type="text"
                    value={formData.address}
                    error={errors.address}
                    onChange={(v) => handleChange("address", v)}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full border py-3 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

import { motion } from "framer-motion";

type StepIndicatorProps = {
  step: number;
};

// Component or helper function.
function StepIndicator({ step }: StepIndicatorProps) {
  const steps = ["General Details", "Personal Details", "Complete"];

  return (
    <div className="flex items-center justify-between mb-10 w-full">
      {steps.map((label, index) => {
        const currentStep = index + 1;
        const isActive = step >= currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* STEP */}
            <div className="flex flex-col items-center w-28 shrink-0">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-border text-text-dim"
                }`}
              >
                {isActive ? "✓" : currentStep}
              </div>

              <span className="mt-2 text-sm text-center">{label}</span>
            </div>

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 mb-6 bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-primary origin-left"
                  animate={{
                    scaleX: step > currentStep ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                  }}
                  initial={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;

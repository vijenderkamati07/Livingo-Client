// src/Components/form/Stepper.jsx
export default function Stepper({
  steps,
  currentStep,
  onStepClick,
  progress = 0,       // NEW prop: real percentage progress
}) {
  return (
    <div className="w-full select-none">
      {/* Progress track */}
      <div className="relative mb-4">
        <div className="h-[3px] w-full rounded-full bg-[#211F30]" />
        <div
          className="h-[3px] rounded-full bg-gradient-to-r from-[#8C5FF6] via-[#F97373] to-[#FBBF24] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step bullets */}
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={label}
              type="button"
              onClick={() => onStepClick?.(index)}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all duration-300
                  ${
                    isActive
                      ? "scale-110 bg-gradient-to-br from-[#8C5FF6] to-[#F43F63] text-white border-transparent shadow-[0_0_12px_rgba(140,95,246,0.7)]"
                      : isCompleted
                      ? "bg-[#1D182A] text-[#E5E3F3] border-[#8C5FF6]/50"
                      : "bg-[#141320] text-[#9D99B0] border-[#38344A]"
                  }`}
                >
                  {index + 1}
                </div>
              </div>

              <span
                className={`text-[11px] sm:text-xs font-medium transition-all duration-200
                ${
                  isActive
                    ? "text-white"
                    : isCompleted
                    ? "text-[#C9C5D4]"
                    : "text-[#6E6782]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

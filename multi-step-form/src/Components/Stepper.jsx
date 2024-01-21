import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  // State to store the modified steps
  const [newStep, setNewStep] = useState([]);

  // Ref to hold the original steps
  const stepRef = useRef();

  // Function to update the step based on the current step number
  const updateStep = (stepNumber, steps) => {
    const newSteps = steps.map((step, index) => {
      return {
        ...step,
        highlighted: index === stepNumber,
        selected: index <= stepNumber,
        completed: index < stepNumber,
      };
    });
    return newSteps;
  };

  // Effect to update steps whenever steps or currentStep changes
  useEffect(() => {
    // Initialize steps state with initial configuration
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));

    // Save the initial steps in the ref
    stepRef.current = stepsState;

    // Update the steps based on the current step number
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  // Generate JSX for displaying steps
  const displaySteps = newStep.map((step, index) => (
    <div
      key={index}
      className={
        index !== newStep.length - 1
          ? "w-full flex items-center"
          : "flex items-center"
      }
    >
      <div className="relative flex flex-col items-center text-teal-600">
        {/* Step indicator */}
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300
             h-12 w-12 flex items-center justify-center py-3 ${
               step.selected
                 ? "bg-green-600 text-white font-bold border border-green-600"
                 : ""
             }`}
        >
          {step.completed ? (
            <span className="text-white font-bold text-xl">✓</span>
          ) : (
            index + 1
          )}
        </div>
        {/* Description */}
        <div
          className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step.highlighted ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {step.description}
        </div>
      </div>
      {/* Divider line between steps */}
      {index < newStep.length - 1 && (
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}
        ></div>
      )}
    </div>
  ));

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;

import { useEffect, useState } from "react";
import "./App.css";
import Stepper from "./Components/Stepper";
import StepperControl from "./Components/StepperControl";
import PersonalInfo from "./Components/steps/PersonalInfo";
import AddressInfo from "./Components/steps/AddressInfo";
import Final from "./Components/steps/Final";
import { StepperContext } from "./Contexts/StepperContext";
import AccountSetup from "./Components/steps/AccountSetup";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isError, setIsErrors] = useState(true);
  const [finalData, setFinalData] = useState([]);

  const steps = ["Personal information", "Address ", "Account Setup"];

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length + 1 && setCurrentStep(newStep);
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <AddressInfo />;
      case 3:
        return <AccountSetup />;
      case 4:
        return <Final />;
      default:
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        {/* steps */}
        <div className="container horizontal mt-5">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Info for Each step */}
        <div className="my-10 p-10">
          <StepperContext.Provider
            value={{
              userData,
              setUserData,
              finalData,
              setFinalData,
              validationErrors,
              setValidationErrors,
              isError,
              setIsErrors,
            }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>

        {/* Buttons */}
        {currentStep !== steps.length + 1 && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            errors={isError}
          />
        )}
      </div>
    </div>
  );
}

export default App;

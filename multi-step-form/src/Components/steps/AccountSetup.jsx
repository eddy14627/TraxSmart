import React, { useContext, useEffect } from "react";
import { StepperContext } from "../../Contexts/StepperContext";
import { AccountValidateInput } from "../Utils/AccountValidation";

const AccountSetup = () => {
  const {
    userData,
    setUserData,
    validationErrors,
    setValidationErrors,
    setIsErrors,
  } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    AccountValidateInput(
      name,
      value,
      validationErrors,
      setValidationErrors,
      userData
    );
  };

  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 10 &&
      Object.values(userData).every((val) => val !== "");

    const hasErrors = Object.keys(validationErrors).some(
      (key) => validationErrors[key] !== ""
    );

    setIsErrors(!allFieldsFilled || hasErrors);
  }, [userData, validationErrors, setIsErrors]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Username
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["username"] || ""}
            name="username"
            placeholder="Username"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.username && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.username}
          </p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["password"] || ""}
            name="password"
            placeholder="Password"
            type="password"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.password && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.password}
          </p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Confirm Password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["confirmPassword"] || ""}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountSetup;

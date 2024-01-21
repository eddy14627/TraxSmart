import React, { useContext, useEffect } from "react";
import { StepperContext } from "../../Contexts/StepperContext";

const PersonalInfo = () => {
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
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let errors = { ...validationErrors };

    switch (name) {
      case "fullname":
        errors.fullname =
          value.length < 3 ? "Minimum length is 3 characters" : "";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = emailRegex.test(value) ? "" : "Invalid email format";
        break;
      case "dob":
        errors.dob =
          isValidDate(value) && isDateBeforeToday(value)
            ? ""
            : "Invalid date format or date is not before today";
        break;
      default:
        break;
    }

    setValidationErrors(errors);
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const isDateBeforeToday = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    return selectedDate < today;
  };

  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 3 &&
      Object.values(userData).every((val) => val !== "");

    const hasErrors = Object.keys(validationErrors).some(
      (key) => validationErrors[key] !== ""
    );

    setIsErrors(!allFieldsFilled || hasErrors);
  }, [userData]);
  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Full Name
        </div>
        <div className="bg-white my-2 p-1 flex border rounded">
          <input
            onChange={handleChange}
            value={userData["fullname"] || ""}
            name="fullname"
            placeholder="full name"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.fullname ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.fullname && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.fullname}
          </p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Email Address
        </div>
        <div className="bg-white my-2 p-1 flex border rounded">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            placeholder="Email"
            type="email"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.email && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Date of Birth
        </div>
        <div className="bg-white my-2 p-1 flex border rounded">
          <input
            onChange={handleChange}
            value={userData["dob"] || ""}
            name="dob"
            type="date"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.dob ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.dob && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.dob}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;

import React, { useEffect } from "react";
import { useContext } from "react";
import { StepperContext } from "../../Contexts/StepperContext";

const Address = () => {
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
      case "streetAddress":
        errors.streetAddress =
          value.length < 5 ? "Minimum length is 5 characters" : "";
        break;
      case "city":
        errors.city = value.length < 3 ? "Minimum length is 3 characters" : "";
        break;
      case "state":
        errors.state = value ? "" : "Please select a state";
        break;
      case "zipCode":
        errors.zipCode = /^\d+$/.test(value) ? "" : "Zip Code must be numeric";
        break;
      default:
        break;
    }
    setValidationErrors(errors);
  };
  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 7 &&
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
          Street Address
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["streetAddress"] || ""}
            name="streetAddress"
            placeholder="Street Address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {validationErrors.streetAddress && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.streetAddress}
          </p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          City
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["city"] || ""}
            name="city"
            placeholder="City"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {validationErrors.city && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          State
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <select
            onChange={handleChange}
            value={userData["state"] || ""}
            name="state"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          >
            <option value="">Select State</option>
            <option value="AP">Andhra Pradesh</option>
            <option value="AR">Arunachal Pradesh</option>
            <option value="AS">Assam</option>
            <option value="BR">Bihar</option>
            <option value="CT">Chhattisgarh</option>
            <option value="GA">Goa</option>
            <option value="GJ">Gujarat</option>
            <option value="HR">Haryana</option>
            <option value="HP">Himachal Pradesh</option>
            <option value="JH">Jharkhand</option>
            <option value="KA">Karnataka</option>
            <option value="KL">Kerala</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="MH">Maharashtra</option>
            <option value="MN">Manipur</option>
            <option value="ML">Meghalaya</option>
            <option value="MZ">Mizoram</option>
            <option value="NL">Nagaland</option>
            <option value="OR">Odisha</option>
            <option value="PB">Punjab</option>
            <option value="RJ">Rajasthan</option>
            <option value="SK">Sikkim</option>
            <option value="TN">Tamil Nadu</option>
            <option value="TG">Telangana</option>
            <option value="TR">Tripura</option>
            <option value="UT">Uttarakhand</option>
            <option value="UP">Uttar Pradesh</option>
            <option value="WB">West Bengal</option>
            <option value="AN">Andaman and Nicobar Islands</option>
            <option value="CH">Chandigarh</option>
            <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
            <option value="DL">Delhi</option>
            <option value="JK">Jammu and Kashmir</option>
            <option value="LA">Ladakh</option>
            <option value="LD">Lakshadweep</option>
            <option value="PY">Puducherry</option>
          </select>
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Zip Code
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["zipCode"] || ""}
            name="zipCode"
            placeholder="Zip Code"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {validationErrors.zipCode && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.zipCode}
          </p>
        )}
      </div>
    </div>
  );
};

export default Address;

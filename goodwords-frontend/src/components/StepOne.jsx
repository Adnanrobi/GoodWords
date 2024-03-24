import React, { useContext } from "react";
import { RegistrationContext } from "../contexts/RegistrationContext";

const StepOne = () => {
  const { registrationData, setRegistrationData } =
    useContext(RegistrationContext);

  const updateField = (field, value) => {
    setRegistrationData({
      ...registrationData,
      [field]: value,
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={registrationData.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={registrationData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
      />
    </div>
  );
};

export default StepOne;

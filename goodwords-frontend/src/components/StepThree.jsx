import React, { useContext } from "react";
import { RegistrationContext } from "../contexts/RegistrationContext";

const StepThree = ({ setConfirmPassword }) => {
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
        type="email"
        placeholder="Email Address"
        value={registrationData.email}
        onChange={(e) => updateField("email", e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registrationData.password}
        onChange={(e) => updateField("password", e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  );
};

export default StepThree;

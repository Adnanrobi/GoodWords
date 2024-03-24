import React, { useContext } from "react";
import { RegistrationContext } from "../contexts/RegistrationContext";

const StepTwo = () => {
  const { registrationData, setRegistrationData } =
    useContext(RegistrationContext);

  const updateField = (field, value) => {
    setRegistrationData({
      ...registrationData,
      [field]: value,
    });
  };

  const handleDateChange = (e) => {
    updateField("birthDate", e.target.value);
    e.target.type = "text"; // change type to text after selecting date
    e.target.style.color = "#000"; // change color to default after selecting date
  };

  const handleDateFocus = (e) => {
    e.target.type = "date"; // change type to date on focus
    e.target.style.color = "transparent"; // hide placeholder text on focus
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = "text";
    }
  };

  return (
    <div>
      <input
        type="text" // initially text
        onFocus={handleDateFocus}
        onBlur={handleDateBlur}
        onChange={handleDateChange}
        placeholder="Date of Birth"
        value={registrationData.birthDate || ""} // If birthDate is not set, fallback to empty string
        className={registrationData.birthDate ? "has-value" : ""}
      />
      <select
        value={registrationData.gender}
        onChange={(e) => updateField("gender", e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default StepTwo;

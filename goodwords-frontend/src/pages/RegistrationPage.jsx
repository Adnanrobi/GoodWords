import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { RegistrationProvider } from "../contexts/RegistrationContext";

const RegistrationPage = () => {
  return (
    <RegistrationProvider>
      <div className="registration-container">
        <RegistrationForm />
      </div>
    </RegistrationProvider>
  );
};

export default RegistrationPage;

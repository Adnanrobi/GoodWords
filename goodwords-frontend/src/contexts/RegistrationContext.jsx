import React, { createContext, useState } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
  });

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        setRegistrationData,
        confirmPassword,
        setConfirmPassword,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

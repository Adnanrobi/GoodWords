import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationContext } from "../contexts/RegistrationContext";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";

const stepComponents = [StepOne, StepTwo, StepThree];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registrationData } = useContext(RegistrationContext);
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log("Registration successful", data.registerUser);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration error", error);
    },
  });

  const handleNext = () => {
    if (step === stepComponents.length - 1) {
      if (registrationData.password !== confirmPassword) {
        // handle password mismatch error
        console.error("Passwords do not match.");
        return;
      }
      registerUser({ variables: { ...registrationData } });
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const CurrentStep = stepComponents[step];

  return (
    <div className="form-wrapper">
      <h2 className="form-title">SIGN UP</h2>
      <div className="form-container">
        <CurrentStep setConfirmPassword={setConfirmPassword} />
        {step > 0 && (
          <button onClick={handleBack} disabled={loading}>
            BACK
          </button>
        )}
        <button onClick={handleNext} disabled={loading}>
          {step === stepComponents.length - 1 ? "SIGN UP" : "NEXT"}
        </button>
        {error && <div>Error: {error.message}</div>}
        {data && <div>Registration successful! Please proceed to login.</div>}
        <div>
          Already have an account?{" "}
          <span className="form-switch-link" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

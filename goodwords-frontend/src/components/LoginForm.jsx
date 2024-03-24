import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      // Assuming the JWT is returned directly
      console.log("Login successful", data.loginUser);
      // Here you might want to store the token, and then navigate
      // localStorage.setItem('token', data.loginUser);
      // navigate('/dashboard'); // Navigate to the dashboard or relevant page
    },
    onError: (error) => {
      console.error("Login error", error);
      // Here you can set state to show error messages if needed
    },
  });

  const handleLogin = () => {
    loginUser({ variables: { email, password } });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">SIGN IN</h2>
      <div className="form-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          LOGIN
        </button>
        <div>
          Don't have an account?{" "}
          <span
            className="form-switch-link"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

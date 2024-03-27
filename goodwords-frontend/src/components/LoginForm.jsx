import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("Login successful", data.loginUser);
      // Store the token in localStorage
      localStorage.setItem("token", data.loginUser.token);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login error", error);
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
        {data && <div>Login successful! Redirecting to dashboard...</div>}
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

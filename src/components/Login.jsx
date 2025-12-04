import { useState } from "react";
import { useNavigate } from "react-router";
import * as jose from "jose";
import axios from "axios";
import URL from "../config.js";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: email.toLowerCase(),
        password: password,
      });
      if (response.data.ok) {
        let decodedToken = jose.decodeJwt(response.data.token);
        console.log(
          "Email extracted from the JWT token after login: ",
          decodedToken.userEmail
        );
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="screen">
        <div className="box">
          <h3>Login</h3>
          <label>E-Mail</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-login" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;

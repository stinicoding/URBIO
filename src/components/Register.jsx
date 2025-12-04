import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import URL from "../config.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [shown, setShown] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShown(true);
  }, [email, password, password2]);

  const validateRegistration = async () => {
    if (!name) {
      setMessage("Set a Name");
    }
    let email_split1 = email.split("@");
    let email_split2 = email.split(".");
    //console.log(email_split1)
    //console.log(email_split2)
    if (email_split1.length !== 2 || email_split2.length !== 2) {
      setMessage("Invalid Email");
    } else if (password.length < 8) {
      setMessage("Password must have at least 8 characters.");
    } else if (password !== password2) {
      setMessage("Passwords should match.");
    } else {
      let result = await register();
      //console.log(result);
      if (result === true) {
        setMessage("Successfully registered");
        setSuccess(true);
        navigate("/login");
      }
    }
  };

  const register = async () => {
    try {
      const response = await axios.post(`${URL}/users/register`, {
        name: name,
        email: email,
        password: password,
        password2: password2,
      });
      //console.log(response);
      if (response.data.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {success ? (
        <div className="screen">
          <h4>{message}</h4>
        </div>
      ) : (
        <div className="screen">
          <div className="box">
            <h3>Register</h3>
            <label>Your Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <label>Your E-Mail</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <label>Set a Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button onClick={validateRegistration}>Register</button>
          </div>
          <div>
            <h4>{shown && message}</h4>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;

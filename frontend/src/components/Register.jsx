import { useState, useEffect } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [shown, setShown] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    validateRegistration();
    setShown(true);
  }, [email, password, password2]);

  const validateRegistration = () => {
    let email_split1 = email.split("@")
    let email_split2 = email.split(".")
    if (email_split1.length !== 2 && email_split2 !== 2) {
        setMessage("Invalid Email")
    }
    if (password.length < 8) {
      setMessage("Password must have at least 8 characters.");
    } else if (password !== password2) {
      setMessage("Passwords should match.");
    } else {
      let result = register();
      if (result === true) {
        setMessage("Successfully registered");
        setSuccess(true);
      }
    }
  };

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4040/users/register",
        { name: name, email: email, password: password }
      );
      console.log(response)
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
        <div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
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
            <p>{shown && message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;

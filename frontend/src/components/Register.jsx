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
    setShown(true)
  }, [email, password, password2]);

  const validateRegistration = () => {
    if (password.length < 8) {
      setMessage("Password must have at least 8 characters.");
    } else if (password !== password2) {
      setMessage("Passwords should match.");
    } else {
      setMessage("Successfully registered");
      setSuccess(true);
    }
  };

  return (
    <>
      {success ? (
        <div>
          <p>{shown && message}</p>
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
            <button>Register</button>
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

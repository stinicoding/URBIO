import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import * as jose from "jose"; //npm i jose
import axios from "axios";
import URL from "./config.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Startpage from "./components/Startpage";
import Trending from "./components/Trending";
import Login from "./components/Login";
import Register from "./components/Register";
import Blog from "./components/Blog";
import Groups from "./components/Groups";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [city, setCity] = useState("");

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/token`);
          return response.data.ok ? login(token) : setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    let user = { email: decodedToken.userEmail };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Startpage setCity={setCity} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/trending" element={<Trending setCity={setCity} />} />
          <Route path="/blog" element={<Blog owner={user?.email} />} />
          <Route path="/groups" element={<Groups owner={user?.email} city={city}/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

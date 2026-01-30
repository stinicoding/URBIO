import Logo_Pigeon from "../pictures/Logo_Pigeon.png";
import Profile from "../pictures/Profile.png";
import { NavLink } from "react-router";

function Header({ isLoggedIn, setIsLoggedIn, owner }) {
  return (
    <div className="header-background">
      <div className="flex">
        <div className="header-left">
          <img className="logo" src={Logo_Pigeon} alt="URBIO-Logo" />
          <NavLink id="home" to={"/"}>
            <h1>URBIO</h1>
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div className="header-right">
            <NavLink to={"/profile"}>
            <img className="icon-profile" src={Profile} alt="Profile" />
            </NavLink>
            <p className="header-owner">{owner}</p>
            <NavLink
              className="button-nav"
              to={"/"}
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <div className="header-right">
            <NavLink className="button-nav" to={"/login"}>
              Login
            </NavLink>
            <NavLink className="button-nav" to={"/register"}>
              Register
            </NavLink>
          </div>
        )}
      </div>
      <div>
        {isLoggedIn && (
          <div className="header-nav">
            <NavLink className="button-nav" to={"/"}>
              Home
            </NavLink>
            <NavLink className="button-nav" to={"/trending"}>
              Trending
            </NavLink>
            <NavLink className="button-nav" to={"/blog"}>
              MyBlog
            </NavLink>
            {/*
          <NavLink className="button-nav">Friends</NavLink>
          */}
            <NavLink className="button-nav" to={"/groups"}>
              Groups
            </NavLink>
            {/*
          <NavLink className="button-nav">Events</NavLink>
          */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

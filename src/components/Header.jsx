import Logo_Pigeon from "../pictures/Logo_Pigeon.png";
import Profile from "../pictures/Profile.png";
import { NavLink } from "react-router";

function Header({ isLoggedIn }) {
  return (
    <div className="flex header-background">
      <div className="header-left">
        <img className="logo" src={Logo_Pigeon} alt="URBIO-Logo" />
        <NavLink id="home" to={"/"}>
          <h1>URBIO</h1>
        </NavLink>
      </div>
      {isLoggedIn ? (
        <div className="header-right">
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
          <p className="button-nav">Logout</p>
          <img className="icon-profile" src={Profile} alt="Profile" />
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
  );
}

export default Header;

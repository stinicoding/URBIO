import Logo_Pigeon from "../pictures/Logo_Pigeon.png";
import Profile from "../pictures/Profile.png";
import { NavLink } from "react-router";

function Header({ isLoggedIn }) {
  return (
    <div className="flex header-background">
      <div className="flex">
        <img className="logo" src={Logo_Pigeon} alt="URBIO-Logo" />
        <NavLink id="home" to={"/"}><h1>URBIO</h1></NavLink>
      </div>
      {
      isLoggedIn ? (
        <div className="flex">
          <NavLink className="button-nav" to={"/blog"}>MyBlog</NavLink>
          <NavLink className="button-nav">Friends</NavLink>
          <NavLink className="button-nav">Groups</NavLink>
          <NavLink className="button-nav">Events</NavLink>
          <img className="icon-profile" src={Profile} alt="Profile"/>
        </div>
      ) : (
        <div className="flex">
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;

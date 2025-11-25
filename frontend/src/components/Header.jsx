import Logo_Pigeon from "../pictures/Logo_Pigeon.png";
import Profile from "../pictures/Profile.png";
import { NavLink } from "react-router";

function Header({ isLoggedIn }) {
  return (
    <div className="flex header-background">
      <div className="flex">
        <img className="logo" src={Logo_Pigeon} alt="URBIO-Logo" />
        <h1>URBIO</h1>
      </div>
      {isLoggedIn ? (
        <div className="flex">
          <button>MyBlog</button>
          <button>Friends</button>
          <button>Groups</button>
          <button>Events</button>
          <img className="icon-profile" src={Profile} />
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

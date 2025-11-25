import Logo_Pigeon from "../pictures/Logo_Pigeon.png";
import Profile from "../pictures/Profile.png";

let loggedin = true;

function Header() {
  return (
    <div className="flex header-background">
      <div className="flex">
        <img className="logo" src={Logo_Pigeon} alt="URBIO-Logo" />
        <h1>URBIO</h1>
      </div>
      {loggedin ? (
        <div className="flex">
          <button>MyBlog</button>
          <button>Friends</button>
          <button>Groups</button>
          <button>Events</button>
          <img className="icon-profile" src = {Profile}/>
        </div>
      ) : (
        <div className="flex">
          <button>Login</button>
          <button>Register</button>
        </div>
      )}
    </div>
  );
}

export default Header;

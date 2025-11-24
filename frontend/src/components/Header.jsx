import Logo_Pigeon from "../pictures/Logo_Pigeon.png";

function Header() {
  return (
    <div className="flex header-background">
      <div className="flex">
        <img className="logo" src={Logo_Pigeon} alt="URBIO-Logo" />
        <h1>URBIO</h1>
      </div>
      <div className="flex">
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Header;

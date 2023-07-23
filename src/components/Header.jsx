import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-center pt-12 pb-20">
      <Link to={"/"}>
        <img src={logo} alt="star wars" />
      </Link>
    </header>
  );
}

export default Header;

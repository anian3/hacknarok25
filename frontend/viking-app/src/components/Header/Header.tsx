import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="w-full p-4 bg-amber-700">
      <nav className="flex items-center max-w-6xl mx-auto">
        <Link to="/" className="flex-shrink-0 mr-8">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
        <div className="flex flex-1 justify-end space-x-16">
          <Link to="/muse" className="hover:underline text-lg">
            Choose a muse
          </Link>
          <Link to="/community" className="hover:underline text-lg">
            Community
          </Link>
          <Link to="/messages" className="hover:underline text-lg">
            Messages
          </Link>
          <Link to="/profile" className="hover:underline text-lg">
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

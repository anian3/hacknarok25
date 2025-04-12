import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/assets/logo.png";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full p-4 bg-slate-900 relative">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-end space-x-8 lg:space-x-16 flex-1">
          <Link to="/muse" className="hover:underline text-lg text-white">
            Choose a muse
          </Link>
          <Link to="/community" className="hover:underline text-lg text-white">
            Community
          </Link>
          <Link to="/messages" className="hover:underline text-lg text-white">
            Messages
          </Link>
          <Link to="/profile" className="hover:underline text-lg text-white">
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-amber-700 shadow-lg z-50">
          <div className="flex flex-col py-2">
            <Link
              to="/muse"
              className="px-4 py-3 hover:bg-amber-800 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Choose a muse
            </Link>
            <Link
              to="/community"
              className="px-4 py-3 hover:bg-amber-800 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/messages"
              className="px-4 py-3 hover:bg-amber-800 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              to="/profile"
              className="px-4 py-3 hover:bg-amber-800 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

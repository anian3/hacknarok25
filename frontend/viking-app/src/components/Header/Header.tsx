import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/assets/logo.png";
import bank_outline from "/assets/bank-outline.png";
import chat_outline from "/assets/chat-outline.png";
import profile_outline from "/assets/profile_outline.png";
import hand_extended_outline from "/assets/hand-extended-outline.png";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full p-4 bg-granat relative">
      <nav className="flex items-center justify-between mx-5">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="md:flex justify-end space-x-8 lg:space-x-16 flex-1">
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/muse"
              className="flex flex-col items-center hover:underline text-lg text-white"
            >
              <img src={bank_outline} alt="Bank" className="h-8 w-8 mb-1" />
              <span>Choose a muse</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/community"
              className="flex flex-col items-center hover:underline text-lg text-white"
            >
              <img
                src={hand_extended_outline}
                alt="Hand"
                className="h-8 w-8 mb-1"
              />
              <span>Community</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/messages"
              className="flex flex-col items-center hover:underline text-lg text-white"
            >
              <img src={chat_outline} alt="Messages" className="h-8 w-8 mb-1" />
              <span>Messages</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/profile"
              className="flex flex-col items-center hover:underline text-lg text-white"
            >
              <img
                src={profile_outline}
                alt="Profile"
                className="h-8 w-8 mb-1"
              />
              <span>Profile</span>
            </Link>
          </div>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 shadow-lg z-50">
          <div className="flex flex-col py-2">
            <Link
              to="/muse"
              className="px-4 py-3 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Choose a muse
            </Link>
            <Link
              to="/community"
              className="px-4 py-3 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/messages"
              className="px-4 py-3 text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              to="/profile"
              className="px-4 py-3 text-white text-lg"
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

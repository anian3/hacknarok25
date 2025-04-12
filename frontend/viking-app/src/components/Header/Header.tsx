import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/assets/logo.png";
import bank_outline from "/assets/bank-outline.png";
import chat_outline from "/assets/chat-outline.png";
import profile_outline from "/assets/profile_outline.png";
import hand_extended_outline from "/assets/hand-extended-outline.png";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    // Function to update state based on viewport width
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Common navigation items
  const navItems = [
    { path: "/muse", icon: bank_outline, alt: "Bank", label: "Choose a muse" },
    {
      path: "/community",
      icon: hand_extended_outline,
      alt: "Hand",
      label: "Community",
    },
    {
      path: "/messages",
      icon: chat_outline,
      alt: "Messages",
      label: "Messages",
    },
    {
      path: "/profile",
      icon: profile_outline,
      alt: "Profile",
      label: "Profile",
    },
  ];
  
  return (
    <header className="w-full p-4 bg-granat relative">
      <nav className="flex items-center justify-between mx-5">
        {/* Logo - visible on all screens */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10 md:h-12" />
        </Link>
        
        {/* Desktop Navigation - only visible on non-mobile */}
        {!isMobile && (
          <div className="flex-1">
            <div className="flex justify-end space-x-8 lg:space-x-16">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="flex flex-col items-center justify-center"
                >
                  <Link
                    to={item.path}
                    className="flex flex-col items-center hover:underline text-lg text-white"
                  >
                    <img
                      src={item.icon}
                      alt={item.alt}
                      className="h-8 w-8 mb-1 block"
                      style={{ display: "block" }}
                    />
                    <span>{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Mobile Menu Button - only visible on mobile */}
        {isMobile && (
          <div>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        )}
      </nav>
      
      {/* Mobile Navigation - conditionally rendered with toggle */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900 shadow-lg z-50 w-full">
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-3 text-white text-lg flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="h-6 w-6 mr-2"
                  style={{ display: "block" }}
                />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
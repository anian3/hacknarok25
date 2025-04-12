import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full p-4 bg-gray-200">
      <nav>
        <Link to="/" className="mr-4">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
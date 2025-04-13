function Footer() {
    return (
      <footer className="w-full p-4 bg-granat text-center text-white flex flex-col">
        <p>&copy; {new Date().getFullYear()} NineMuses</p>
        <div>
          <a href="/privacy-policy" className="text-white hover:underline">
            Privacy Policy
          </a>
          <span className="mx-2">|</span>
          <a href="/terms-of-service" className="text-white hover:underline">
            Terms of Service
          </a>
          <span className="mx-2">|</span>
          <span className="text-white hover:underline">
            <span>Phone: </span>
            <a href="/contact" className="text-white hover:underline">
              +420 213 766 669 
            </a> 
          </span>
          <span className="mx-2">|</span>
          <span className="text-white hover:underline">
            <span>Email: </span>
            <a href="/contact" className="text-white hover:underline">
              ninemuses@gmail.com
            </a>
          </span>
        </div>
      </footer>
    );
  }
  
  export default Footer;
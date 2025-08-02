

export const Footer = () => {
  return (
    <footer className="bg-[#CAF0F8] text-black py-8 px-4 border-t border-gray-200/30">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <p className="text-sm font-montserrat">
            Over 2,000+ local issues resolved. Join the community making neighborhoods better.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
          <a 
            href="#" 
            className="font-montserrat text-sm hover:underline transition-all duration-200"
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className="font-montserrat text-sm hover:underline transition-all duration-200"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="font-montserrat text-sm hover:underline transition-all duration-200"
          >
            Admin Login
          </a>
          <a 
            href="#" 
            className="font-montserrat text-sm hover:underline transition-all duration-200"
          >
            Help & Support
          </a>
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <a 
            href="#" 
            aria-label="Facebook"
            className="font-montserrat text-sm hover:text-gray-700 transition-colors duration-200"
          >
            Facebook
          </a>
          <a 
            href="#" 
            aria-label="Twitter"
            className="font-montserrat text-sm hover:text-gray-700 transition-colors duration-200"
          >
            Twitter
          </a>
          <a 
            href="#" 
            aria-label="Instagram"
            className="font-montserrat text-sm hover:text-gray-700 transition-colors duration-200"
          >
            Instagram
          </a>
        </div>

        <div className="pt-4 border-t border-gray-200/30">
          <p className="font-montserrat text-xs text-gray-800">
            &copy; {new Date().getFullYear()} LocalFix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

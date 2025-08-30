import { ArrowRight, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-gray-200 border-t">
      {/* Main Footer Section */}
      <div className="mx-auto px-6 lg:px-8 py-16 max-w-7xl">
        {/* Top Section: Let's Connect */}
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center mb-16">
          {/* Logo Area */}
          <div className="flex items-center mb-8 lg:mb-0">
            <div className="flex items-center">
              <div className="bg-red-600 mr-2 px-4 py-2">
                <span className="font-bold text-white text-3xl lg:text-4xl tracking-tight">
                  LET&#39;S
                </span>
              </div>
              <span className="font-bold text-black text-3xl lg:text-4xl tracking-tight">
                CONNECT
              </span>
            </div>
            <ArrowRight 
              className="ml-8 w-8 lg:w-10 h-8 lg:h-10 text-black transition-transform hover:translate-x-2 duration-300" 
            />
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="flex justify-center items-center border border-gray-300 hover:border-red-600 rounded-full w-12 h-12 text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="flex justify-center items-center border border-gray-300 hover:border-red-600 rounded-full w-12 h-12 text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="flex justify-center items-center border border-gray-300 hover:border-red-600 rounded-full w-12 h-12 text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="flex justify-center items-center border border-gray-300 hover:border-red-600 rounded-full w-12 h-12 text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Legal Column */}
          <div>
            <h3 className="mb-6 font-semibold text-black text-sm uppercase tracking-wider">
              LEGAL
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-6 font-semibold text-black text-sm uppercase tracking-wider">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:hello@eventhive.com" 
                  className="block text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  hello@eventhive.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919877132536" 
                  className="block text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  +91 9877132536
                </a>
              </li>
              <li>
                <span className="block text-gray-600 text-sm">
                  Panjab University, Chandigarh
                </span>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="mb-6 font-semibold text-black text-sm uppercase tracking-wider">
              PLATFORM
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Event Creation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Ticketing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-6 font-semibold text-black text-sm uppercase tracking-wider">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors duration-200"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border-gray-200 border-t">
        <div className="mx-auto px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="font-bold text-black text-xl tracking-tight">
                EventHive
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 EventHive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
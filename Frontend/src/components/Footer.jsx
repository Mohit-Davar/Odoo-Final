import { ArrowRight, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-gray-200 border-t text-white">
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
              <span className="font-bold text-white text-3xl lg:text-4xl tracking-tight">
                CONNECT
              </span>
            </div>
            <ArrowRight
              className="ml-8 w-8 lg:w-10 h-8 lg:h-10 text-secondary transition-transform hover:translate-x-2 duration-300"
            />
          </div>

          {/* Social Media */}
          <div className="flex space-x-4 text-white">
            <a
              href="https://www.linkedin.com/company/eventhive"
              className="flex justify-center items-center border border-white hover:border-red-600 rounded-full w-12 h-12 text-white hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/eventhive"
              className="flex justify-center items-center border border-white hover:border-red-600 rounded-full w-12 h-12 text-white hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/eventhive"
              className="flex justify-center items-center border border-white hover:border-red-600 rounded-full w-12 h-12 text-white hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/eventhive"
              className="flex justify-center items-center border border-white hover:border-red-600 rounded-full w-12 h-12 text-white hover:text-red-600 hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white">
          {/* Legal Column */}
          <div>
            <h3 className="mb-6 font-semibold text-secondary text-sm uppercase tracking-wider">
              LEGAL
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.eventhive.com/privacy-policy"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/terms-of-service"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/cookie-policy"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-6 font-semibold text-secondary text-sm uppercase tracking-wider">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@eventhive.com"
                  className="block text-white hover:text-red-600 text-sm transition-colors duration-200"
                >
                  hello@eventhive.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919877132536"
                  className="block text-white hover:text-red-600 text-sm transition-colors duration-200"
                >
                  +91 9877132536
                </a>
              </li>
              <li>
                <span className="block text-white text-sm">
                  Panjab University, Chandigarh
                </span>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="mb-6 font-semibold text-secondary text-sm uppercase tracking-wider">
              PLATFORM
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.eventhive.com/event-creation"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Event Creation
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/ticketing"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ticketing
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/analytics"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/support"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-6 font-semibold text-secondary text-sm uppercase tracking-wider">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.eventhive.com/about"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/careers"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/blog"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.eventhive.com/press-kit"
                  className="text-white hover:text-red-600 text-sm transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black border-gray-200 border-t text-white">
        <div className="mx-auto px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="font-bold text-white text-xl tracking-tight">
                EventHive
              </span>
            </div>
            <p className="text-white text-sm">
              © 2025 EventHive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
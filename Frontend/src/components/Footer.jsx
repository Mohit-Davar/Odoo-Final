import React from 'react';
import { ArrowRight, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top Section: Let's Connect */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          {/* Logo Area */}
          <div className="flex items-center mb-8 lg:mb-0">
            <div className="flex items-center">
              <div className="bg-red-600 px-4 py-2 mr-2">
                <span className="text-white font-bold text-3xl lg:text-4xl tracking-tight">
                  LET'S
                </span>
              </div>
              <span className="text-black font-bold text-3xl lg:text-4xl tracking-tight">
                CONNECT
              </span>
            </div>
            <ArrowRight 
              className="ml-8 text-black w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 hover:translate-x-2" 
            />
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Legal Column */}
          <div>
            <h3 className="text-black font-semibold text-sm tracking-wider uppercase mb-6">
              LEGAL
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-black font-semibold text-sm tracking-wider uppercase mb-6">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:hello@eventhive.com" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm block"
                >
                  hello@eventhive.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15551234567" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm block"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <span className="text-gray-600 text-sm block">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-black font-semibold text-sm tracking-wider uppercase mb-6">
              PLATFORM
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Event Creation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Ticketing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-black font-semibold text-sm tracking-wider uppercase mb-6">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-black font-bold text-xl tracking-tight">
                EventHive
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 EventHive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
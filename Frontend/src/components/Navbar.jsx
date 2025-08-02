import React, { useState } from 'react';
import { PlusCircle, ListChecks } from 'lucide-react';
import {
  AppLogo,
  NavButton,
  LoginButton,
  UserAvatar,
  UserDropdown,
  MobileMenu,
  MobileMenuToggle
} from './header_ui.jsx';
import { useNavigate } from 'react-router-dom';

const Header = ({ 
  user = "mudit", 
  currentRoute = '/', 
}) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };


  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleLoginClick = () => {
    navigate("/login")
  };

  const handleLogoutClick = () => {
    navigate("/logout");
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Add Montserrat font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
      <header className="relative w-full bg-gradient-to-r from-[#CAF0F8]/80 via-[#CAF0F8]/70 to-[#CAF0F8]/80 backdrop-blur-md border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section - Logo */}
            <div className="flex items-center">
              <AppLogo onClick={handleLogoClick} />
            </div>

            {/* Desktop Navigation - Right section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {/* Create New Issue Button */}
                  <NavButton
                    icon={PlusCircle}
                    onClick={() => onNavigate('/report')}
                    isActive={currentRoute === '/report'}
                  >
                    Create New Issue
                  </NavButton>

                  {/* My Issues Button */}
                  <NavButton
                    icon={ListChecks}
                    onClick={() => onNavigate('/issues')}
                    isActive={currentRoute === '/issues'}
                  >
                    My Issues
                  </NavButton>

                  {/* User Avatar and Dropdown */}
                  <div className="relative">
                    <UserAvatar 
                      user={user} 
                      onClick={toggleUserDropdown}
                    />
                    <UserDropdown
                      isOpen={isUserDropdownOpen}
                      onClose={() => setIsUserDropdownOpen(false)}
                      onProfile={handleProfileClick}
                      onLogout={handleLogoutClick}
                    />
                  </div>
                </>
              ) : (
                /* Login Button */
                <LoginButton onClick={handleLoginClick} />
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              {user && (
                <UserAvatar 
                  user={user} 
                  onClick={() => onNavigate('/profile')}
                />
              )}
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          user={user}
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onLogout={handleLogoutClick}
        />
      </header>
    </>
  );
};

export default Header;

// Alternative export name for flexibility
export { Header as AppHeader };
import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  User, 
  PlusCircle, 
  ListChecks, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

// Logo Component
export const AppLogo = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black/20 rounded-lg p-2"
    aria-label="Go to dashboard"
  >
    <div className="bg-black/10 backdrop-blur-sm rounded-lg p-2 group-hover:bg-black/20 transition-all duration-200">
      <Shield className="h-6 w-6 text-black" />
    </div>
    <span className="text-xl font-bold text-black font-[Montserrat] hidden sm:block">
      CivicTrack
    </span>
  </button>
);

// Navigation Button Component
export const NavButton = ({ icon: Icon, children, onClick, isActive = false, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-2 px-4 py-2 rounded-xl
      bg-white/20 backdrop-blur-sm border border-white/30
      hover:bg-white/30 hover:border-white/40 hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-black/20
      transition-all duration-200 shadow-sm
      ${isActive ? 'bg-white/40 border-white/50 shadow-md' : ''}
      ${className}
    `}
    aria-label={typeof children === 'string' ? children : ''}
  >
    <Icon className="h-4 w-4 text-black" />
    <span className="text-sm font-medium text-black font-[Montserrat] hidden md:block">
      {children}
    </span>
  </button>
);

// Login Button Component
export const LoginButton = ({ onClick }) => (
  <NavButton
    icon={User}
    onClick={onClick}
    className="bg-black/10 hover:bg-black/20 border-black/20 hover:border-black/30"
  >
    Login
  </NavButton>
);

// User Avatar Component
export const UserAvatar = ({ user, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-200 group"
    aria-label="User menu"
  >
    <div className="relative">
      {user?.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={user.name || 'User'}
          className="h-8 w-8 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-200"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 group-hover:border-white/50 flex items-center justify-center transition-all duration-200">
          <User className="h-4 w-4 text-black" />
        </div>
      )}
    </div>
    <span className="text-sm font-bold text-black font-[Montserrat] hidden sm:block truncate max-w-[120px]">
      {user?.name || 'User'}
    </span>
  </button>
);

// Dropdown Menu Component
export const UserDropdown = ({ isOpen, onClose, onProfile, onLogout }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-48 bg-white/80 backdrop-blur-md border border-white/40 rounded-xl shadow-lg py-2 z-50"
    >
      <button
        onClick={onProfile}
        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/40 transition-all duration-200 focus:outline-none focus:bg-white/40"
      >
        <User className="h-4 w-4 text-black" />
        <span className="text-sm font-medium text-black font-[Montserrat]">
          View Profile
        </span>
      </button>
      <button
        onClick={onLogout}
        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/40 transition-all duration-200 focus:outline-none focus:bg-white/40"
      >
        <LogOut className="h-4 w-4 text-black" />
        <span className="text-sm font-medium text-black font-[Montserrat]">
          Logout
        </span>
      </button>
    </div>
  );
};

// Mobile Menu Component
export const MobileMenu = ({ isOpen, onClose, user, currentRoute, onNavigate, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/40 shadow-lg">
      <div className="p-4 space-y-3">
        {user && (
          <>
            <button
              onClick={() => {
                onNavigate('/report');
                onClose();
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                currentRoute === '/report' 
                  ? 'bg-white/50 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              } border border-white/30`}
            >
              <PlusCircle className="h-5 w-5 text-black" />
              <span className="text-sm font-medium text-black font-[Montserrat]">
                Create New Issue
              </span>
            </button>
            <button
              onClick={() => {
                onNavigate('/issues');
                onClose();
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                currentRoute === '/issues' 
                  ? 'bg-white/50 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              } border border-white/30`}
            >
              <ListChecks className="h-5 w-5 text-black" />
              <span className="text-sm font-medium text-black font-[Montserrat]">
                My Issues
              </span>
            </button>
            <button
              onClick={() => {
                onNavigate('/profile');
                onClose();
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                currentRoute === '/profile' 
                  ? 'bg-white/50 border-white/60' 
                  : 'bg-white/20 hover:bg-white/30'
              } border border-white/30`}
            >
              <User className="h-5 w-5 text-black" />
              <span className="text-sm font-medium text-black font-[Montserrat]">
                View Profile
              </span>
            </button>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 text-black" />
              <span className="text-sm font-medium text-black font-[Montserrat]">
                Logout
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Mobile Menu Toggle Button
export const MobileMenuToggle = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-200"
    aria-label="Toggle mobile menu"
  >
    {isOpen ? (
      <X className="h-5 w-5 text-black" />
    ) : (
      <Menu className="h-5 w-5 text-black" />
    )}
  </button>
);
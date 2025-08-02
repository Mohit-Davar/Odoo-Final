import React from 'react';
import {
  Search, User, MapPin, Clock, Flag, ChevronLeft, ChevronRight,
  Construction, Lightbulb, Droplets, Trash2, Shield, AlertTriangle,
  CheckCircle, Loader, X, Calendar, Eye, MapPinIcon
} from 'lucide-react';

// Header Component
export const Header = ({ onLoginClick }) => (
  <header className="flex justify-between items-center p-6 backdrop-blur-md bg-white/20 rounded-2xl shadow-lg border border-white/30 mb-6">
    <div className="flex items-center space-x-3">
      <MapPinIcon className="h-8 w-8 text-black" />
      <h1 className="text-2xl font-bold text-black font-montserrat">CivicTrack</h1>
    </div>
    <button
      onClick={onLoginClick}
      className="flex items-center space-x-2 px-6 py-3 backdrop-blur-md bg-white/30 rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-200 shadow-lg"
    >
      <User className="h-5 w-5 text-black" />
      <span className="font-montserrat font-medium text-black">Login</span>
    </button>
  </header>
);

// Filter Dropdown Component
export const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none backdrop-blur-md bg-white/30 border border-white/40 rounded-xl px-4 py-3 pr-10 text-black font-montserrat font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <option value="">{label}</option>
      {options.map(option => (
        <option key={option} value={option} className="bg-white text-black">
          {option}
        </option>
      ))}
    </select>
    <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black pointer-events-none" />
  </div>
);

// Search Bar Component
export const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search issues..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl px-4 py-3 pr-12 text-black placeholder-black/60 font-montserrat focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
    />
    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black/60" />
  </div>
);

// Filter Bar Component
export const FilterBar = ({ filters, onFilterChange, searchValue, onSearchChange }) => (
  <div className="backdrop-blur-md bg-white/20 rounded-2xl p-6 shadow-lg border border-white/30 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FilterDropdown
        label="Category"
        value={filters.category}
        options={['Roads', 'Lighting', 'Water Supply', 'Cleanliness', 'Public Safety', 'Obstructions']}
        onChange={(value) => onFilterChange('category', value)}
        icon={Construction}
      />
      <FilterDropdown
        label="Status"
        value={filters.status}
        options={['Reported', 'In Progress', 'Resolved']}
        onChange={(value) => onFilterChange('status', value)}
        icon={Clock}
      />
      <FilterDropdown
        label="Distance"
        value={filters.distance}
        options={['1km', '3km', '5km']}
        onChange={(value) => onFilterChange('distance', value)}
        icon={MapPin}
      />
      <SearchBar value={searchValue} onChange={onSearchChange} />
    </div>
  </div>
);

// Category Icon Component
const getCategoryIcon = (category) => {
  const iconMap = {
    'Roads': Construction,
    'Lighting': Lightbulb,
    'Water Supply': Droplets,
    'Cleanliness': Trash2,
    'Public Safety': Shield,
    'Obstructions': AlertTriangle
  };
  const IconComponent = iconMap[category] || AlertTriangle;
  return <IconComponent className="h-6 w-6 text-black" />;
};

// Status Badge Component
const getStatusBadge = (status) => {
  const statusConfig = {
    'Reported': { icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    'In Progress': { icon: Loader, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    'Resolved': { icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' }
  };
  
  const config = statusConfig[status] || statusConfig['Reported'];
  const IconComponent = config.icon;
  
  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <IconComponent className="h-3 w-3" />
      <span>{status}</span>
    </span>
  );
};

// Issue Card Component
export const IssueCard = ({ issue, onClick, onFlag }) => (
  <div
    onClick={() => onClick(issue)}
    className="backdrop-blur-md bg-white/30 rounded-2xl p-6 shadow-lg border border-white/40 cursor-pointer hover:bg-white/40 transition-all duration-200 hover:scale-105 hover:shadow-xl"
  >
    <div className="flex justify-between items-start mb-4">
      {getCategoryIcon(issue.category)}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFlag(issue.id);
        }}
        className="p-2 hover:bg-white/30 rounded-lg transition-colors"
      >
        <Flag className="h-4 w-4 text-black/60" />
      </button>
    </div>
    
    <div className="mb-3">
      {getStatusBadge(issue.status)}
    </div>
    
    <h3 className="font-montserrat font-semibold text-black mb-2 line-clamp-2">
      {issue.title}
    </h3>
    
    <p className="text-black/80 text-sm font-montserrat mb-4 line-clamp-2">
      {issue.description}
    </p>
    
    <div className="space-y-2 text-sm text-black/70 font-montserrat">
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4" />
        <span>{issue.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{issue.timestamp}</span>
        </div>
        <span className="font-medium">{issue.distance}</span>
      </div>
    </div>
    
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {issue.verified ? (
          <User className="h-4 w-4 text-black/60" />
        ) : (
          <Eye className="h-4 w-4 text-black/40" />
        )}
        <span className="text-xs text-black/60 font-montserrat">
          {issue.verified ? 'Verified' : 'Anonymous'}
        </span>
      </div>
      
      {issue.hasImage && (
        <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
          <span className="text-xs text-black/60">📷</span>
        </div>
      )}
    </div>
  </div>
);

// Issue Grid Component
export const IssueGrid = ({ issues, onCardClick, onFlag }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {issues.map(issue => (
      <IssueCard
        key={issue.id}
        issue={issue}
        onClick={onCardClick}
        onFlag={onFlag}
      />
    ))}
  </div>
);

// Pagination Component
export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center space-x-2 backdrop-blur-md bg-white/20 rounded-2xl p-4 shadow-lg border border-white/30">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/40 transition-all duration-200"
    >
      <ChevronLeft className="h-4 w-4 text-black" />
      <span className="font-montserrat font-medium text-black">Prev</span>
    </button>
    
    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-4 py-2 rounded-xl font-montserrat font-medium transition-all duration-200 ${
          currentPage === page
            ? 'bg-white/60 text-black border-2 border-white/60'
            : 'backdrop-blur-md bg-white/30 text-black border border-white/40 hover:bg-white/40'
        }`}
      >
        {page}
      </button>
    ))}
    
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/40 transition-all duration-200"
    >
      <span className="font-montserrat font-medium text-black">Next</span>
      <ChevronRight className="h-4 w-4 text-black" />
    </button>
  </div>
);

// Modal Component
export const Modal = ({ isOpen, onClose, issue }) => {
  if (!isOpen || !issue) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-md bg-white/90 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              {getCategoryIcon(issue.category)}
              <h2 className="text-2xl font-bold text-black font-montserrat">
                {issue.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/30 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-black" />
            </button>
          </div>
          
          <div className="mb-4">
            {getStatusBadge(issue.status)}
          </div>
          
          <div className="space-y-4 text-black font-montserrat">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-black/80">{issue.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-black/80">{issue.location}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Distance</h3>
                <p className="text-black/80">{issue.distance}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Status Log</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Issue reported - {issue.timestamp}</span>
                </div>
                {issue.status !== 'Reported' && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                    <Loader className="h-5 w-5 text-blue-600" />
                    <span>Investigation started</span>
                  </div>
                )}
                {issue.status === 'Resolved' && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Issue resolved</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Component
export const Toast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;
  
  const bgColor = type === 'success' ? 'bg-green-100 border-green-200 text-green-800' :
                  type === 'error' ? 'bg-red-100 border-red-200 text-red-800' :
                  'bg-blue-100 border-blue-200 text-blue-800';
  
  return (
    <div className={`fixed top-4 right-4 z-50 backdrop-blur-md rounded-xl p-4 shadow-lg border ${bgColor}`}>
      <div className="flex items-center justify-between">
        <span className="font-montserrat font-medium">{message}</span>
        <button onClick={onClose} className="ml-4">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Footer Component
export const Footer = () => (
  <footer className="backdrop-blur-md bg-white/20 rounded-2xl p-6 shadow-lg border border-white/30 mt-8">
    <div className="text-center text-black font-montserrat">
      <p className="text-lg font-semibold mb-2">2,000+ issues resolved in your community</p>
      <p className="text-sm text-black/70">© 2025 CivicTrack. Making communities better, one issue at a time.</p>
    </div>
  </footer>
);
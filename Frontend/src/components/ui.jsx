import { useEffect, useState } from 'react';
import {
  Search, User, MapPin, Clock, Flag, ChevronLeft, ChevronRight,
  Construction, Lightbulb, Droplets, Trash2, Shield, AlertTriangle,
  CheckCircle, Loader, X, Eye, MapPinIcon
} from 'lucide-react';

// Header Component
export const Header = ({ onLoginClick }) => (
  <header className="flex justify-between items-center bg-white/20 shadow-lg backdrop-blur-md mb-6 p-6 border border-white/30 rounded-2xl">
    <div className="flex items-center space-x-3">
      <MapPinIcon className="w-8 h-8 text-black" />
      <h1 className="font-montserrat font-bold text-black text-2xl">CivicTrack</h1>
    </div>
    <button
      onClick={onLoginClick}
      className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 shadow-lg backdrop-blur-md px-6 py-3 border border-white/40 rounded-xl transition-all duration-200"
    >
      <User className="w-5 h-5 text-black" />
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
      className="bg-white/30 backdrop-blur-md px-4 py-3 pr-10 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 font-montserrat font-medium text-black appearance-none"
    >
      <option value="">{label}</option>
      {options.map(option => (
        <option key={option} value={option} className="bg-white text-black">
          {option}
        </option>
      ))}
    </select>
    <Icon className="top-1/2 right-3 absolute w-5 h-5 text-black -translate-y-1/2 pointer-events-none transform" />
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
      className="bg-white/30 backdrop-blur-md px-4 py-3 pr-12 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 w-full font-montserrat text-black placeholder-black/60"
    />
    <Search className="top-1/2 right-4 absolute w-5 h-5 text-black/60 -translate-y-1/2 transform" />
  </div>
);

import { getIssueCategories, getIssueStatuses } from '@/api/issues';

// Filter Bar Component
export const FilterBar = ({ filters, onFilterChange, searchValue, onSearchChange }) => {
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categories, statuses] = await Promise.all([
          getIssueCategories(),
          getIssueStatuses(),
        ]);
        setCategories(categories.map(c => c.name));
        setStatuses(statuses.map(s => s.name));
      } catch (error) {
        console.error('Failed to fetch filters', error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="bg-white/20 shadow-lg backdrop-blur-md mb-6 p-6 border border-white/30 rounded-2xl">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
        <FilterDropdown
          label="Category"
          value={filters.category}
          options={categories}
          onChange={(value) => onFilterChange('category', value)}
          icon={Construction}
        />
        <FilterDropdown
          label="Status"
          value={filters.status}
          options={statuses}
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
}

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
  return <IconComponent className="w-6 h-6 text-black" />;
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
      <IconComponent className="w-3 h-3" />
      <span>{status}</span>
    </span>
  );
};

export const IssueCard = ({ issue, onClick, onFlag }) => (
  <div
    onClick={() => onClick(issue)}
    className="bg-white/30 hover:bg-white/40 shadow-lg hover:shadow-xl backdrop-blur-md p-6 border border-white/40 rounded-2xl hover:scale-105 transition-all duration-200 cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      {getCategoryIcon(issue.category)}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFlag(issue.id);
        }}
        className="hover:bg-white/30 p-2 rounded-lg transition-colors"
      >
        <Flag className="w-4 h-4 text-black/60" />
      </button>
    </div>

    <div className="mb-3">{getStatusBadge(issue.status)}</div>

    <h3 className="mb-2 font-semibold text-black line-clamp-2">{issue.title}</h3>
    <p className="mb-4 text-black/80 text-sm line-clamp-2">{issue.description}</p>

    <div className="space-y-2 text-black/70 text-sm">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4" />
        <span>{issue.location}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{issue.timestamp}</span>
        </div>
        <span className="font-medium">{issue.distance}</span>
      </div>
    </div>

    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-2">
        {issue.verified ? (
          <User className="w-4 h-4 text-black/60" />
        ) : (
          <Eye className="w-4 h-4 text-black/40" />
        )}
        <span className="text-black/60 text-xs">
          {issue.verified ? issue.reporter || 'Verified' : issue.pseudonym || 'Anonymous'}
        </span>
      </div>

      {issue.hasImage && (
        <div className="flex justify-center items-center bg-white/50 rounded-lg w-12 h-12">
          <span className="text-black/60 text-xs">📷</span>
        </div>
      )}
    </div>
  </div>
);


// Issue Grid Component
export const IssueGrid = ({ issues, onCardClick, onFlag }) => (
  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
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
  <div className="flex justify-center items-center space-x-2 bg-white/20 shadow-lg backdrop-blur-md p-4 border border-white/30 rounded-2xl">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 disabled:opacity-50 backdrop-blur-md px-4 py-2 border border-white/40 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-4 h-4 text-black" />
      <span className="font-montserrat font-medium text-black">Prev</span>
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-4 py-2 rounded-xl font-montserrat font-medium transition-all duration-200 ${currentPage === page
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
      className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 disabled:opacity-50 backdrop-blur-md px-4 py-2 border border-white/40 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
    >
      <span className="font-montserrat font-medium text-black">Next</span>
      <ChevronRight className="w-4 h-4 text-black" />
    </button>
  </div>
);

// Modal Component
export const Modal = ({ isOpen, onClose, issue }) => {
  if (!isOpen || !issue) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white/90 shadow-2xl backdrop-blur-md border border-white/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              {getCategoryIcon(issue.category)}
              <h2 className="font-montserrat font-bold text-black text-2xl">
                {issue.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          <div className="mb-4">
            {getStatusBadge(issue.status)}
          </div>

          <div className="space-y-4 font-montserrat text-black">
            <div>
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="text-black/80">{issue.description}</p>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Location</h3>
                <p className="text-black/80">{issue.location}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Distance</h3>
                <p className="text-black/80">{issue.distance}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Status Log</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Issue reported - {issue.timestamp}</span>
                </div>
                {issue.status !== 'Reported' && (
                  <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg">
                    <Loader className="w-5 h-5 text-blue-600" />
                    <span>Investigation started</span>
                  </div>
                )}
                {issue.status === 'Resolved' && (
                  <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
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
      <div className="flex justify-between items-center">
        <span className="font-montserrat font-medium">{message}</span>
        <button onClick={onClose} className="ml-4">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Footer Component
export const Footer = () => (
  <footer className="bg-white/20 shadow-lg backdrop-blur-md mt-8 p-6 border border-white/30 rounded-2xl">
    <div className="font-montserrat text-black text-center">
      <p className="mb-2 font-semibold text-lg">2,000+ issues resolved in your community</p>
      <p className="text-black/70 text-sm">© 2025 CivicTrack. Making communities better, one issue at a time.</p>
    </div>
  </footer>
);
import React, { useState, useEffect } from 'react';
import {
  Header, FilterBar, IssueGrid, Pagination, Modal, Toast, Footer
} from '@/components/ui.jsx';


// Mock data for issues
const mockIssues = [
  {
    id: 1,
    category: 'Roads',
    status: 'Reported',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues and potential vehicle damage. Located near the intersection with Oak Avenue.',
    location: 'Main Street & Oak Ave',
    timestamp: '2m ago',
    distance: '0.8km',
    verified: true,
    hasImage: true
  },
  {
    id: 2,
    category: 'Lighting',
    status: 'In Progress',
    title: 'Broken Street Light',
    description: 'Street light has been out for several days, creating safety concerns for pedestrians and drivers at night.',
    location: 'Cedar Park Boulevard',
    timestamp: '1h ago',
    distance: '1.2km',
    verified: false,
    hasImage: false
  },
  {
    id: 3,
    category: 'Cleanliness',
    status: 'Resolved',
    title: 'Overflowing Trash Bin',
    description: 'Public trash bin overflowing with garbage scattered around the area. Attracting pests and creating unsanitary conditions.',
    location: 'City Park Entrance',
    timestamp: '3h ago',
    distance: '0.5km',
    verified: true,
    hasImage: true
  },
  {
    id: 4,
    category: 'Water Supply',
    status: 'Reported',
    title: 'Water Main Leak',
    description: 'Water main leak causing flooding on sidewalk and potential water waste. Urgent attention needed.',
    location: 'Elm Street',
    timestamp: '30m ago',
    distance: '2.1km',
    verified: true,
    hasImage: true
  },
  {
    id: 5,
    category: 'Public Safety',
    status: 'In Progress',
    title: 'Damaged Crosswalk Sign',
    description: 'Pedestrian crossing sign is damaged and barely visible, creating safety hazards for foot traffic.',
    location: 'School Zone - Maple Ave',
    timestamp: '2h ago',
    distance: '1.8km',
    verified: false,
    hasImage: false
  },
  {
    id: 6,
    category: 'Obstructions',
    status: 'Reported',
    title: 'Fallen Tree Branch',
    description: 'Large tree branch has fallen across the sidewalk, blocking pedestrian access and creating safety concerns.',
    location: 'Pine Street Sidewalk',
    timestamp: '45m ago',
    distance: '1.5km',
    verified: true,
    hasImage: true
  },
  {
    id: 7,
    category: 'Roads',
    status: 'Resolved',
    title: 'Faded Road Markings',
    description: 'Lane markings and crosswalk lines are severely faded, making it difficult to navigate safely.',
    location: 'Downtown Intersection',
    timestamp: '1d ago',
    distance: '0.9km',
    verified: true,
    hasImage: false
  },
  {
    id: 8,
    category: 'Lighting',
    status: 'Reported',
    title: 'Park Light Out',
    description: 'Lighting in the children\'s playground area is not functioning, making evening use unsafe.',
    location: 'Riverside Park',
    timestamp: '4h ago',
    distance: '2.3km',
    verified: false,
    hasImage: true
  }
];

const Dashboard = () => {
  // State management
  const [issues, setIssues] = useState(mockIssues);
  const [filteredIssues, setFilteredIssues] = useState(mockIssues);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    distance: ''
  });
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });
  
  const issuesPerPage = 6;

  // Filter and search logic
  useEffect(() => {
    let filtered = issues;

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }

    // Apply distance filter
    if (filters.distance) {
      const maxDistance = parseFloat(filters.distance);
      filtered = filtered.filter(issue => {
        const issueDistance = parseFloat(issue.distance);
        return issueDistance <= maxDistance;
      });
    }

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, searchValue, issues]);

  // Pagination logic
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);
  const startIndex = (currentPage - 1) * issuesPerPage;
  const currentIssues = filteredIssues.slice(startIndex, startIndex + issuesPerPage);

  // Event handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  const handleFlag = (issueId) => {
    showToast('Issue flagged for moderation', 'success');
    // In a real app, this would make an API call
  };

  const handleLogin = () => {
    showToast('Login functionality coming soon!', 'info');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleToastClose = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen font-montserrat" style={{
      background: `
        linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 25%, #90E0EF 50%, #68D8F0 75%, #48BFE3 100%),
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
        conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 90deg, rgba(255,255,255,0.1) 180deg, transparent 270deg)
      `
    }}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header onLoginClick={handleLogin} />
        
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        
        {currentIssues.length > 0 ? (
          <>
            <IssueGrid
              issues={currentIssues}
              onCardClick={handleCardClick}
              onFlag={handleFlag}
            />
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 shadow-lg border border-white/40">
              <p className="text-xl font-montserrat font-medium text-black">
                No issues found matching your criteria
              </p>
              <p className="text-black/70 font-montserrat mt-2">
                Try adjusting your filters or search terms
              </p>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        issue={selectedIssue}
      />
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleToastClose}
      />
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import {
  Header, FilterBar, IssueGrid, Pagination, Modal, Toast, Footer
} from '@/components/ui.jsx';
import { getIssues } from '@/api/issues';
import { flagIssue } from '@/api/flags';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // State management
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
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
  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const fetchedIssues = await getIssues();
        setIssues(fetchedIssues);
        setFilteredIssues(fetchedIssues);
      } catch (error) {
        showToast('Failed to fetch issues', 'error');
      }
    };

    fetchIssues();
  }, []);

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

  const handleFlag = async (issueId) => {
    try {
      await flagIssue(issueId, 'No reason provided');
      showToast('Issue flagged for moderation', 'success');
    } catch (error) {
      showToast('Failed to flag issue', 'error');
    }
  };

  const handleLogin = () => {
    navigate('/login');
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

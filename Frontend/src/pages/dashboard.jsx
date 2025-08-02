import { useQuery } from '@tanstack/react-query';
import { getIssues } from '@/api/issues';
import { flagIssue } from '@/api/flags';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { FilterBar, Footer, Header, IssueGrid, Toast } from '@/components/ui';
import { Modal, Pagination } from '@heroui/react';

const Dashboard = () => {
    const navigate = useNavigate();

    // Filter/search/pagination state
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

    const { data: issues = [], isLoading, isError } = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues
    });

    const issuesPerPage = 6;

    //Filter and search logic
    const filteredIssues = useMemo(() => {
        let filtered = [...issues];

        if (filters.category) {
            filtered = filtered.filter(issue => issue.category === filters.category);
        }

        if (filters.status) {
            filtered = filtered.filter(issue => issue.status === filters.status);
        }

        if (filters.distance) {
            const maxDistance = parseFloat(filters.distance);
            filtered = filtered.filter(issue => {
                const issueDistance = parseFloat(issue.distance);
                return issueDistance <= maxDistance;
            });
        }

        if (searchValue) {
            filtered = filtered.filter(issue =>
                issue.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                issue.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                issue.location.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return filtered;
    }, [issues, filters, searchValue]);

    const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);
    const startIndex = (currentPage - 1) * issuesPerPage;
    const currentIssues = filteredIssues.slice(startIndex, startIndex + issuesPerPage);

    // Handlers
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => setSearchValue(value);
    const handlePageChange = (page) => page >= 1 && page <= totalPages && setCurrentPage(page);
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
        } catch {
            showToast('Failed to flag issue', 'error');
        }
    };

    const handleLogin = () => navigate('/login');
    const showToast = (message, type = 'info') => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    };
    const handleToastClose = () => setToast(prev => ({ ...prev, isVisible: false }));

    return (
        <div className="min-h-screen font-montserrat" style={{
            background: `
        linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 25%, #90E0EF 50%, #68D8F0 75%, #48BFE3 100%),
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
        conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 90deg, rgba(255,255,255,0.1) 180deg, transparent 270deg)
        `
        }}>
            <div className="mx-auto px-4 py-8 max-w-7xl container">
                <Header onLoginClick={handleLogin} />
                <FilterBar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    searchValue={searchValue}
                    onSearchChange={handleSearchChange}
                />

                {isLoading ? (
                    <div className="py-12 font-semibold text-lg text-center">Loading issues...</div>
                ) : isError ? (
                    <div className="py-12 text-red-600 text-lg text-center">Failed to load issues</div>
                ) : currentIssues.length > 0 ? (
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
                    <div className="py-12 text-center">
                        <div className="bg-white/30 shadow-lg backdrop-blur-md p-8 border border-white/40 rounded-2xl">
                            <p className="font-montserrat font-medium text-black text-xl">
                                No issues found matching your criteria
                            </p>
                            <p className="mt-2 font-montserrat text-black/70">
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

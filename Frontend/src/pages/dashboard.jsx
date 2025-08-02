import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIssues } from '@/api/issues';
import {
    FilterBar, IssueGrid, Pagination, Modal, Toast
} from '@/components/ui';
import { flagIssue } from '@/api/flags';

const Dashboard = () => {
    const [filters, setFilters] = useState({ category: '', status: '', distance: '' });
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', isVisible: false });

    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                });
            },
            (err) => console.error("Location error:", err),
            { enableHighAccuracy: true }
        );
    }, []);

    const { data: rawIssues = [], isLoading } = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues
    });

    const haversine = (coord1, coord2) => {
        const R = 6371e3;
        const φ1 = coord1.lat * Math.PI / 180;
        const φ2 = coord2.lat * Math.PI / 180;
        const Δφ = (coord2.lat - coord1.lat) * Math.PI / 180;
        const Δλ = (coord2.lon - coord1.lon) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const issues = useMemo(() => {
        return rawIssues.map(issue => {
            const coords = JSON.parse(issue.geojson)?.coordinates || [0, 0];
            const issueCoords = { lat: coords[1], lon: coords[0] };

            let distance = '';
            if (userLocation) {
                const meters = haversine(userLocation, issueCoords);
                distance = meters > 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)} m`;
            }

            const timeDiffMin = Math.floor((Date.now() - new Date(issue.created_at)) / 60000);
            const timeAgo = timeDiffMin < 1
                ? "Just now"
                : timeDiffMin === 1
                    ? "1 minute ago"
                    : `${timeDiffMin} minutes ago`;

            return {
                id: issue.id,
                title: issue.title,
                description: issue.description,
                location: issue.address,
                category: issue.category,
                status: issue.status,
                distance,
                timestamp: timeAgo,
                verified: !issue.is_anonymous,
                hasImage: !!issue.photo_url,
                imageUrl: issue.photo_url,
                pseudonym: issue.pseudonym,
                reporter: issue.user_name
            };
        });
    }, [rawIssues, userLocation]);

    // Filter + Search + Pagination
    const filteredIssues = useMemo(() => {
        let filtered = [...issues];

        if (filters.category) filtered = filtered.filter(i => i.category === filters.category);
        if (filters.status) filtered = filtered.filter(i => i.status === filters.status);
        if (filters.distance && userLocation) {
            const maxDist = parseFloat(filters.distance);
            filtered = filtered.filter(i => parseFloat(i.distance) <= maxDist);
        }
        if (searchValue) {
            filtered = filtered.filter(i =>
                i.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                i.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                i.location.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return filtered;
    }, [issues, filters, searchValue, userLocation]);

    const issuesPerPage = 6;
    const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);
    const currentIssues = filteredIssues.slice((currentPage - 1) * issuesPerPage, currentPage * issuesPerPage);

    const handleFlag = async (issueId) => {
        try {
            await flagIssue(issueId, 'Reason...');
            showToast('Flagged issue for moderation', 'success');
        } catch {
            showToast('Error flagging issue', 'error');
        }
    };

    const showToast = (msg, type = 'info') => {
        setToast({ message: msg, type, isVisible: true });
        setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    };

    return (
        <div className="min-h-screen font-montserrat"
            style={{
                background: `
        linear-gradient(135deg, #CAF0F8 0%, #ADE8F4 25%, #90E0EF 50%, #68D8F0 75%, #48BFE3 100%),
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
        conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 90deg, rgba(255,255,255,0.1) 180deg, transparent 270deg)
        `
            }}
        >
            <div className="mx-auto px-4 py-8 max-w-7xl container">
                <FilterBar
                    filters={filters}
                    onFilterChange={(type, val) => setFilters(prev => ({ ...prev, [type]: val }))}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                />

                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : currentIssues.length > 0 ? (
                    <>
                        <IssueGrid
                            issues={currentIssues}
                            onCardClick={setSelectedIssue}
                            onFlag={handleFlag}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <p className="text-center">No matching issues found</p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                issue={selectedIssue}
            />

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />
        </div>
    );
};

export default Dashboard;

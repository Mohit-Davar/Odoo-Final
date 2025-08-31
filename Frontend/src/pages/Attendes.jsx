import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAttendeesByEvent } from '@/api/attendees';
import { FilterControls, StatsCards, AttendeeTable } from '@/components/Attendes.jsx';
import '../index.css';

// Custom hook for attendee management
const useAttendees = (eventId) => {
  const [filters, setFilters] = useState({
    gender: '',
    attended: '',
    search: ''
  });

  const { data: fetchedAttendees, isLoading, isError, error } = useQuery({
    queryKey: ['attendees', eventId],
    queryFn: () => getAttendeesByEvent(eventId),
    enabled: !!eventId, 
  });

  const allAttendees = fetchedAttendees || [];

  const filteredAttendees = useMemo(() => {
    return allAttendees.filter((attendee) => {
      // Gender filter
      if (filters.gender && attendee.gender !== filters.gender) {
        return false;
      }

      // Attended filter
      if (filters.attended && attendee.attended.toString() !== filters.attended) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          attendee.name.toLowerCase().includes(searchTerm) ||
          attendee.email.toLowerCase().includes(searchTerm) ||
          attendee.phone.includes(searchTerm)
        );
      }

      return true;
    });
  }, [filters, allAttendees]);

  return {
    attendees: filteredAttendees,
    allAttendees,
    filters,
    setFilters,
    isLoading,
    isError,
    error
  };
};

// Main App Component
export default function Attendes() {
  const { id: eventId } = useParams();
  const { attendees, allAttendees, filters, setFilters, isLoading, isError, error } = useAttendees(eventId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex justify-center items-center">
        <p className="text-primary text-6xl">Loading attendees...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-6 flex justify-center items-center">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        
        <StatsCards attendees={allAttendees} />
        
        <FilterControls 
          filters={filters} 
          onFiltersChange={setFilters} 
        />
        
        <AttendeeTable attendees={attendees} />
        
      </div>
    </div>
  );
}


import React, { useState, useMemo } from 'react';
import {FilterControls, StatsCards, AttendeeTable } from '@/components/Attendes.jsx';
import '../index.css';


// Mock data
const mockAttendees = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    phone: '123564789',
    gender: 'Female',
    totalGuests: 2,
    attended: true,
    registrationDate: '2024-08-25',
    ticketType: 'VIP'
  },
  {
    id: '2',
    name: 'Marc',
    email: 'marc@odoo.com',
    phone: '2536548952',
    gender: 'Male',
    totalGuests: 1,
    attended: false,
    registrationDate: '2024-08-26',
    ticketType: 'Standard'
  },
  {
    id: '3',
    name: 'Arjun Patel',
    email: 'arjun@example.com',
    phone: '25463598755',
    gender: 'Male',
    totalGuests: 1,
    attended: true,
    registrationDate: '2024-08-27',
    ticketType: 'Standard'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '9876543210',
    gender: 'Female',
    totalGuests: 3,
    attended: true,
    registrationDate: '2024-08-28',
    ticketType: 'Premium'
  },
  {
    id: '5',
    name: 'Raj Kumar',
    email: 'raj.kumar@company.com',
    phone: '5551234567',
    gender: 'Male',
    totalGuests: 1,
    attended: false,
    registrationDate: '2024-08-29',
    ticketType: 'Standard'
  },
  {
    id: '6',
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    phone: '4447778888',
    gender: 'Female',
    totalGuests: 2,
    attended: true,
    registrationDate: '2024-08-30',
    ticketType: 'VIP'
  }
];

// Custom hook for attendee management
const useAttendees = () => {
  const [filters, setFilters] = useState({
    gender: '',
    attended: '',
    search: ''
  });

  const filteredAttendees = useMemo(() => {
    return mockAttendees.filter((attendee) => {
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
  }, [filters]);

  return {
    attendees: filteredAttendees,
    allAttendees: mockAttendees,
    filters,
    setFilters
  };
};

// Main App Component
export default function Attendes() {
  const { attendees, allAttendees, filters, setFilters } = useAttendees();

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


import React from 'react';
import { User, Search, ChevronDown, Mail, Phone, Users, CheckCircle, XCircle, ArrowRight, Calendar } from 'lucide-react';

// Header Component
export const Header = () => {
  return (
    <header className="bg-secondary border border-supporting rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-accent mb-1">Attendees Details</h1>
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-accent">EventHive</h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-supporting rounded-lg p-2">
            <User className="w-8 h-8 text-accent" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Filter Controls Component
export const FilterControls = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {/* Gender Filter */}
      <div className="relative">
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="filter-dropdown p-2 rounded appearance-none min-w-[140px] cursor-pointer"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-supporting pointer-events-none" />
      </div>

      {/* Attended Filter */}
      <div className="relative">
        <select
          value={filters.attended}
          onChange={(e) => handleFilterChange('attended', e.target.value)}
          className="filter-dropdown p-2 rounded appearance-none min-w-[140px] cursor-pointer"
        >
          <option value="">Attended</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-supporting pointer-events-none" />
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-md ml-auto">
        <input
          type="text"
          placeholder="Search attendees"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input rounded p-2 w-full"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-supporting" />
      </div>
    </div>
  );
};

// Stats Cards Component
export const StatsCards = ({ attendees }) => {
  const totalAttendees = attendees.length;
  const totalAttended = attendees.filter(a => a.attended).length;
  const totalNotAttended = totalAttendees - totalAttended;
  const totalGuests = attendees.reduce((sum, a) => sum + a.totalGuests, 0);

  const stats = [
    {
      title: 'Total Attendees',
      value: totalAttendees,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Attended',
      value: totalAttended,
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Not Attended',
      value: totalNotAttended,
      icon: XCircle,
      color: 'text-red-500'
    },
    {
      title: 'Total Guests',
      value: totalGuests,
      icon: Calendar,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-secondary border border-supporting rounded-xl p-6 hover:border-primary transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-supporting text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-accent mt-1">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Attendee Table Component
export const AttendeeTable = ({ attendees }) => {
  return (
    <div className="bg-secondary border border-supporting rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 grid grid-cols-12 gap-4 bg-secondary-light">
        <div className="col-span-3 table-header">Name</div>
        <div className="col-span-2 table-header">Total Guest</div>
        <div className="col-span-3 table-header">Email</div>
        <div className="col-span-2 table-header">Phone</div>
        <div className="col-span-2 table-header">Gender</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-supporting-dark">
        {attendees.map((attendee, index) => (
          <div
            key={attendee.id}
            className="attendee-row px-6 py-4 grid grid-cols-12 gap-4 items-center group"
          >
            {/* Name with index */}
            <div className="col-span-3 flex items-center space-x-3">
              <span className="text-supporting font-medium text-lg">
                {index + 1}.
              </span>
              <div>
                <div className="text-accent font-medium text-lg">
                  {attendee.name}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {attendee.attended ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-xs text-supporting">
                    {attendee.attended ? 'Attended' : 'Not Attended'}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Guests */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-supporting" />
                <span className="text-accent font-medium text-lg">
                  {attendee.totalGuests}
                </span>
              </div>
              <div className="text-xs text-supporting mt-1">
                {attendee.ticketType}
              </div>
            </div>

            {/* Email */}
            <div className="col-span-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-supporting" />
                <span className="text-accent">
                  {attendee.email}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-supporting" />
                <span className="text-accent">
                  {attendee.phone}
                </span>
              </div>
            </div>

            {/* Gender */}
            <div className="col-span-2 flex items-center justify-between">
              <span className="text-accent">
                {attendee.gender}
              </span>
              <ArrowRight className="w-4 h-4 text-supporting opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {attendees.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Users className="w-12 h-12 text-supporting mx-auto mb-4" />
          <p className="text-supporting text-lg">No attendees found</p>
          <p className="text-supporting-dark text-sm">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};
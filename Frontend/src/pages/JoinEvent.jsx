import React, { useState, useEffect } from 'react';
import { Minus, Plus, User, Mail, Phone, Users } from 'lucide-react';
import { registerForEvent } from '../api/attendees.js';
import { useParams } from 'react-router-dom';


const EventHiveBooking = () => {
  const [currentScreen, setCurrentScreen] = useState('tickets');
  const [ticketCounts, setTicketCounts] = useState({
    standard: 0,
    vip: 0
  });
  const [attendeesData, setAttendeesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { eventId } = useParams();

  const maxTicketsPerUser = 5;
  const ticketPrices = {
    standard: 0,
    vip: 500
  };

  const updateQuantity = (ticketType, change) => {
    setTicketCounts(prev => {
      const currentCount = prev[ticketType];
      const newCount = Math.max(0, Math.min(maxTicketsPerUser, currentCount + change));
      return { ...prev, [ticketType]: newCount };
    });
  };

  const getTotalTickets = () => ticketCounts.standard + ticketCounts.vip;
  const getTotalAmount = () => (ticketCounts.standard * ticketPrices.standard) + (ticketCounts.vip * ticketPrices.vip);

  const proceedToAttendees = () => {
    setCurrentScreen('attendees');
  };

  const goBackToTickets = () => {
    setCurrentScreen('tickets');
  };

  const handleAttendeeChange = (ticketNum, field, value) => {
    setAttendeesData(prev => ({
      ...prev,
      [`${ticketNum}_${field}`]: value
    }));
  };

  const validateForm = () => {
    const totalTickets = getTotalTickets();
    const requiredFields = ['name', 'email', 'phone'];
    
    for (let i = 1; i <= totalTickets; i++) {
      for (const field of requiredFields) {
        const value = attendeesData[`${i}_${field}`];
        if (!value || !value.trim()) {
          return false;
        }
      }
    }
    return true;
  };

  const makePayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const totalTickets = getTotalTickets();
      const attendees = [];
      let ticketNumber = 1;

      for (let i = 0; i < ticketCounts.standard; i++) {
        attendees.push({
          name: attendeesData[`${ticketNumber}_name`],
          email: attendeesData[`${ticketNumber}_email`],
          phone: attendeesData[`${ticketNumber}_phone`],
          gender: attendeesData[`${ticketNumber}_gender`] || null,
          ticketType: 'standard',
        });
        ticketNumber++;
      }

      for (let i = 0; i < ticketCounts.vip; i++) {
        attendees.push({
          name: attendeesData[`${ticketNumber}_name`],
          email: attendeesData[`${ticketNumber}_email`],
          phone: attendeesData[`${ticketNumber}_phone`],
          gender: attendeesData[`${ticketNumber}_gender`] || null,
          ticketType: 'vip',
        });
        ticketNumber++;
      }

      await registerForEvent(eventId, attendees);

      alert('Payment successful! Tickets will be sent to your email and WhatsApp.');
      closeBooking();
    } catch (error) {
      console.error('Error registering attendees:', error);
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeBooking = () => {
    setTicketCounts({ standard: 0, vip: 0 });
    setAttendeesData({});
    setCurrentScreen('tickets');
  };

  const renderAttendeeForm = (ticketNumber, ticketType) => {
    return (
      <div key={ticketNumber} className="bg-black/20 border border-gray-600 rounded-xl p-6 mb-6 backdrop-blur-sm">
        <h3 className="flex items-center gap-3 text-red-500 font-bold text-lg mb-6">
          <div className="w-5 h-5 bg-red-500 rounded"></div>
          Ticket #{ticketNumber} - {ticketType}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-white font-semibold text-sm">
              Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={attendeesData[`${ticketNumber}_name`] || ''}
                onChange={(e) => handleAttendeeChange(ticketNumber, 'name', e.target.value)}
                className="w-full bg-white/10 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white font-semibold text-sm">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={attendeesData[`${ticketNumber}_email`] || ''}
                onChange={(e) => handleAttendeeChange(ticketNumber, 'email', e.target.value)}
                className="w-full bg-white/10 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white font-semibold text-sm">
              Phone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={attendeesData[`${ticketNumber}_phone`] || ''}
                onChange={(e) => handleAttendeeChange(ticketNumber, 'phone', e.target.value)}
                className="w-full bg-white/10 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white font-semibold text-sm">
              Gender
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={attendeesData[`${ticketNumber}_gender`] || ''}
                onChange={(e) => handleAttendeeChange(ticketNumber, 'gender', e.target.value)}
                className="w-full bg-white/10 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-black text-white">Select Gender</option>
                <option value="male" className="bg-black text-white">Male</option>
                <option value="female" className="bg-black text-white">Female</option>
                <option value="other" className="bg-black text-white">Other</option>
                <option value="prefer-not-to-say" className="bg-black text-white">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const generateAttendeesForms = () => {
    const forms = [];
    let ticketNumber = 1;

    // Generate forms for Standard tickets
    for (let i = 0; i < ticketCounts.standard; i++) {
      forms.push(renderAttendeeForm(ticketNumber, 'Standard'));
      ticketNumber++;
    }

    // Generate forms for VIP tickets
    for (let i = 0; i < ticketCounts.vip; i++) {
      forms.push(renderAttendeeForm(ticketNumber, 'VIP'));
      ticketNumber++;
    }

    return forms;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-black/80 border-2 border-gray-600 rounded-2xl p-8 backdrop-blur-lg max-w-md w-full text-center">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">Processing your booking...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {currentScreen === 'tickets' && (
          <div className="bg-black/80 border-2 border-gray-600 rounded-2xl p-8 backdrop-blur-lg shadow-2xl shadow-red-500/20 animate-in fade-in slide-in-from-left duration-500">
            {/* Event Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-lg font-bold mb-4 shadow-lg shadow-red-500/30">
                Energetic Reindeer
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Live Concert Experience</h1>
              <p className="text-xl text-gray-400">Akki</p>
            </div>

            {/* Tickets Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Select Tickets</h2>
              
              {/* Standard Ticket */}
              <div className="bg-white/5 border border-gray-600 rounded-xl p-6 mb-4 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-xl font-bold text-white">Standard</div>
                    <div className="text-xl font-bold text-red-500">₹ 0.00</div>
                  </div>
                  <div className="text-gray-400 text-sm mb-4">Sales ends on 01/09/2025 7:00 AM</div>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity('standard', -1)}
                        disabled={ticketCounts.standard === 0}
                        className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="bg-white/10 border border-gray-600 rounded-lg px-6 py-3 text-white font-bold min-w-[60px] text-center">
                        {ticketCounts.standard}
                      </div>
                      <button
                        onClick={() => updateQuantity('standard', 1)}
                        disabled={ticketCounts.standard >= maxTicketsPerUser}
                        className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {ticketCounts.standard >= maxTicketsPerUser && (
                      <div className="text-red-500 text-sm">Maximum 5 tickets per user</div>
                    )}
                  </div>
                </div>
              </div>

              {/* VIP Ticket */}
              <div className="bg-white/5 border border-gray-600 rounded-xl p-6 mb-4 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-xl font-bold text-white">VIP</div>
                    <div className="text-xl font-bold text-red-500">₹ 500.00</div>
                  </div>
                  <div className="text-gray-400 text-sm mb-4">Sales ends on 01/09/2025 11:30 PM</div>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity('vip', -1)}
                        disabled={ticketCounts.vip === 0}
                        className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="bg-white/10 border border-gray-600 rounded-lg px-6 py-3 text-white font-bold min-w-[60px] text-center">
                        {ticketCounts.vip}
                      </div>
                      <button
                        onClick={() => updateQuantity('vip', 1)}
                        disabled={ticketCounts.vip >= maxTicketsPerUser}
                        className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {ticketCounts.vip >= maxTicketsPerUser && (
                      <div className="text-red-500 text-sm">Maximum 5 tickets per user</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={closeBooking}
                className="px-8 py-3 border-2 border-gray-600 text-gray-400 rounded-lg font-bold uppercase tracking-wider hover:border-white hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                Close
              </button>
              <button
                onClick={proceedToAttendees}
                disabled={getTotalTickets() === 0}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-500 text-white rounded-lg font-bold uppercase tracking-wider disabled:bg-gray-600 disabled:border-gray-600 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1 disabled:hover:translate-y-0 disabled:hover:shadow-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10">
                  {getTotalTickets() > 0 ? `Register (${getTotalTickets()} ticket${getTotalTickets() > 1 ? 's' : ''})` : 'Register'}
                </span>
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'attendees' && (
          <div className="bg-black/80 border-2 border-gray-600 rounded-2xl p-8 backdrop-blur-lg shadow-2xl shadow-red-500/20 animate-in fade-in slide-in-from-right duration-500">
            {/* Event Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-lg font-bold mb-4 shadow-lg shadow-red-500/30">
                Energetic Reindeer
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Attendee Information</h1>
            </div>

            {/* Total Summary */}
            <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 mb-8 text-center">
              <div className="text-2xl font-bold">
                Total Amount: <span className="text-red-500">₹ {getTotalAmount().toFixed(2)}</span>
              </div>
            </div>

            {/* Attendees Forms */}
            <div className="mb-8 max-h-96 overflow-y-auto pr-2">
              {generateAttendeesForms()}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goBackToTickets}
                className="px-8 py-3 border-2 border-gray-600 text-gray-400 rounded-lg font-bold uppercase tracking-wider hover:border-white hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                Cancel
              </button>
              <button
                onClick={makePayment}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-500 text-white rounded-lg font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative z-10">Make Payment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHiveBooking;
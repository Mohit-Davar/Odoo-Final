import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEventDetails } from '../api/event.js';
import { registerForEvent } from '../api/attendees.js';
import { showErrorToast, showSuccessToast } from '@/lib/showToast.js';
import formatDate from '@/lib/formatDate.js';

// Separate components for better structure
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="border-red-500 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="bg-red-500/10 p-6 border border-red-500 rounded-lg text-red-400 text-center">
      {message}
    </div>
  </div>
);

const EventHeader = ({ event }) => (
  <div className="mb-8 text-center">
    <h1 className="mb-2 font-bold text-white text-3xl md:text-4xl">
      {event?.title}
    </h1>
    <p className="mb-2 text-gray-300 text-lg">{event?.description}</p>
    <p className="text-gray-400 text-sm">
      {new Date(event?.start_datetime).toLocaleString()} –
      {new Date(event?.end_datetime).toLocaleString()}
    </p>
  </div>
);

const QuantitySelector = ({ count, onDecrease, onIncrease, disabled, limit }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={onDecrease}
      disabled={count === 0}
      className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 rounded-lg w-10 h-10 font-medium text-white transition-colors disabled:cursor-not-allowed"
    >
      -
    </button>
    <div className="bg-gray-800 px-4 py-2 rounded-lg min-w-[3rem] text-white text-center">
      {count}
    </div>
    <button
      onClick={onIncrease}
      disabled={disabled || count >= limit}
      className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 rounded-lg w-10 h-10 font-medium text-white transition-colors disabled:cursor-not-allowed"
    >
      +
    </button>
  </div>
);

const TicketCard = ({ ticket, count, onQuantityChange }) => {
  const typeKey = ticket.type.toLowerCase();

  return (
    <div className="bg-white/5 hover:bg-white/10 mb-4 p-6 border border-gray-600 rounded-xl transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-white text-xl">{ticket.type}</h3>
        <div className="font-bold text-red-400 text-xl">
          ₹{parseFloat(ticket.price).toFixed(2)}
        </div>
      </div>

      <div className="mb-2 text-gray-400 text-sm">
        Available: {formatDate(ticket.sale_start)} – {formatDate(ticket.sale_end)}
      </div>


      <div className="flex justify-between items-center">
        <QuantitySelector
          count={count}
          onDecrease={() => onQuantityChange(typeKey, -1)}
          onIncrease={() => onQuantityChange(typeKey, 1)}
          limit={ticket.per_user_limit}
        />
        <div className="text-gray-400 text-sm">
          Max: {ticket.per_user_limit} per person
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, type = "text", required, value, onChange, options, placeholder }) => (
  <div className="space-y-2">
    <label className="block font-medium text-gray-200 text-sm">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {type === 'select' ? (
      <select
        value={value || ''}
        onChange={onChange}
        className="bg-white p-3 border border-gray-600 focus:border-red-500 rounded-lg focus:outline-none w-full transition-colors placeholder-gray-400"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white/10 p-3 border border-gray-600 focus:border-red-500 rounded-lg focus:outline-none w-full text-white transition-colors placeholder-gray-400"
      />
    )}
  </div>
);

const AttendeeForm = ({ ticketNumber, ticketType, attendeeData, onFieldChange }) => (
  <div className="backdrop-blur mb-6 p-6 border border-gray-600 rounded-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="flex justify-center items-center bg-red-500 rounded-full w-6 h-6 font-bold text-white text-sm">
        {ticketNumber}
      </div>
      <h3 className="font-bold text-white text-lg">
        {ticketType} Ticket
      </h3>
    </div>

    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
      <FormField
        label="Full Name"
        required
        value={attendeeData[`${ticketNumber}_name`]}
        onChange={(e) => onFieldChange(ticketNumber, 'name', e.target.value)}
        placeholder="Enter full name"
      />

      <FormField
        label="Email Address"
        type="email"
        required
        value={attendeeData[`${ticketNumber}_email`]}
        onChange={(e) => onFieldChange(ticketNumber, 'email', e.target.value)}
        placeholder="Enter email address"
      />

      <FormField
        label="Phone Number"
        type="tel"
        required
        value={attendeeData[`${ticketNumber}_phone`]}
        onChange={(e) => onFieldChange(ticketNumber, 'phone', e.target.value)}
        placeholder="Enter phone number"
      />

      <FormField
        label="Gender"
        type="select"
        value={attendeeData[`${ticketNumber}_gender`]}
        onChange={(e) => onFieldChange(ticketNumber, 'gender', e.target.value)}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
          { value: 'prefer-not-to-say', label: 'Prefer not to say' }
        ]}
      />
    </div>
  </div>
);

const ActionButtons = ({ onBack, onNext, nextLabel, nextDisabled, showBack = true }) => (
  <div className="flex justify-center gap-4 mt-8">
    {showBack && (
      <button
        onClick={onBack}
        className="hover:bg-gray-800 px-8 py-3 border border-gray-500 rounded-lg text-gray-300 transition-colors"
      >
        Back
      </button>
    )}
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-8 py-3 rounded-lg font-medium text-white transition-colors disabled:cursor-not-allowed"
    >
      {nextLabel}
    </button>
  </div>
);

const EventHiveBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [currentScreen, setCurrentScreen] = useState('tickets');
  const [ticketCounts, setTicketCounts] = useState({});
  const [attendeesData, setAttendeesData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['eventDetails', eventId],
    queryFn: () => getEventDetails(eventId),
  });

  // Initialize ticket counts when data loads
  useEffect(() => {
    if (data?.tickets) {
      const initialCounts = {};
      data.tickets.forEach(ticket => {
        initialCounts[ticket.type.toLowerCase()] = 0;
      });
      setTicketCounts(initialCounts);
    }
  }, [data]);

  // Utility functions
  const updateQuantity = (ticketType, change) => {
    setTicketCounts(prev => {
      const currentCount = prev[ticketType] || 0;
      const ticket = data.tickets.find(t => t.type.toLowerCase() === ticketType);
      const maxLimit = ticket?.per_user_limit || 5;

      const newCount = Math.max(0, Math.min(maxLimit, currentCount + change));
      return { ...prev, [ticketType]: newCount };
    });
  };

  const getTotalTickets = () =>
    Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);

  const getTotalAmount = () =>
    data?.tickets?.reduce((sum, ticket) => {
      const count = ticketCounts[ticket.type.toLowerCase()] || 0;
      return sum + (count * parseFloat(ticket.price));
    }, 0) || 0;

  const handleAttendeeChange = (ticketNum, field, value) => {
    setAttendeesData(prev => ({
      ...prev,
      [`${ticketNum}_${field}`]: value,
    }));
  };

  const validateAttendeeForm = () => {
    const totalTickets = getTotalTickets();
    const requiredFields = ['name', 'email', 'phone'];

    for (let i = 1; i <= totalTickets; i++) {
      for (const field of requiredFields) {
        const value = attendeesData[`${i}_${field}`];
        if (!value?.trim()) return false;
      }
    }
    return true;
  };

  const generateAttendeeForms = () => {
    const forms = [];
    let ticketNumber = 1;

    data.tickets.forEach(ticket => {
      const count = ticketCounts[ticket.type.toLowerCase()] || 0;
      for (let i = 0; i < count; i++) {
        forms.push(
          <AttendeeForm
            key={ticketNumber}
            ticketNumber={ticketNumber}
            ticketType={ticket.type}
            attendeeData={attendeesData}
            onFieldChange={handleAttendeeChange}
          />
        );
        ticketNumber++;
      }
    });

    return forms;
  };

  const handleBookingSubmit = async () => {
    if (!validateAttendeeForm()) {
      showErrorToast('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const attendees = [];
      let ticketNumber = 1;

      data.tickets.forEach(ticket => {
        const count = ticketCounts[ticket.type.toLowerCase()] || 0;
        for (let i = 0; i < count; i++) {
          attendees.push({
            name: attendeesData[`${ticketNumber}_name`],
            email: attendeesData[`${ticketNumber}_email`],
            phone: attendeesData[`${ticketNumber}_phone`],
            gender: attendeesData[`${ticketNumber}_gender`] || null,
            ticket: ticket.id,
          });
          ticketNumber++;
        }
      });

      await registerForEvent(eventId, attendees);
      showSuccessToast('Booking confirmed! You\'ll receive tickets via email/WhatsApp.');
      resetForm();
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = ()=>{
    navigate(-1);
  }

  const resetForm = () => {
    const resetCounts = {};
    data?.tickets?.forEach(ticket => {
      resetCounts[ticket.type.toLowerCase()] = 0;
    });
    setTicketCounts(resetCounts);
    setAttendeesData({});
    setCurrentScreen('tickets');
  };

  // Loading and error states
  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorMessage message="Failed to load event details" />;

  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="bg-black backdrop-blur p-8 border border-gray-600 rounded-2xl">

          {currentScreen === 'tickets' && (
            <>
              <EventHeader event={data.event} />

              <h2 className="mb-6 font-bold text-white text-2xl">Select Tickets</h2>

              {data.tickets?.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  count={ticketCounts[ticket.type.toLowerCase()] || 0}
                  onQuantityChange={updateQuantity}
                />
              ))}

              <ActionButtons
                onBack={handleClick}
                onNext={() => setCurrentScreen('attendees')}
                nextLabel={`Continue (${getTotalTickets()} tickets)`}
                nextDisabled={getTotalTickets() === 0}
                showBack={true}
              />
            </>
          )}

          {currentScreen === 'attendees' && (
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-4 font-bold text-white text-3xl">Attendee Information</h1>
                <div className="bg-red-500/20 p-6 border border-red-500 rounded-xl">
                  <div className="font-bold text-white text-2xl">
                    Total Amount: <span className="text-red-400">₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8 pr-2 max-h-96 overflow-y-auto">
                {generateAttendeeForms()}
              </div>

              <ActionButtons
                onBack={() => setCurrentScreen('tickets')}
                onNext={handleBookingSubmit}
                nextLabel={isSubmitting ? 'Processing...' : 'Confirm Booking'}
                nextDisabled={isSubmitting || !validateAttendeeForm()}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventHiveBooking;
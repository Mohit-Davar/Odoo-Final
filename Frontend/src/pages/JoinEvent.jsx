import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEventDetails } from '../api/event.js';
import { registerForEvent } from '../api/attendees.js';

const EventHiveBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate()

  // fixed: no TypeScript generics in JSX
  const [currentScreen, setCurrentScreen] = useState('tickets');
  const [ticketCounts, setTicketCounts] = useState({});
  const [attendeesData, setAttendeesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: eventLoading, isError } = useQuery({
    queryKey: ['eventDetails', eventId],
    queryFn: () => getEventDetails(eventId),
  });

  useEffect(() => {
    if (data?.tickets) {
      const initCounts = {};
      data.tickets.forEach((t) => {
        initCounts[t.type.toLowerCase()] = 0;
      });
      setTicketCounts(initCounts);
    }
  }, [data]);

  if (!data) return null;

  const updateQuantity = (ticketType, change) => {
    setTicketCounts((prev) => {
      const currentCount = prev[ticketType] || 0;
      const newCount = Math.max(
        0,
        Math.min(
          data.tickets.find((t) => t.type.toLowerCase() === ticketType)?.per_user_limit || 5,
          currentCount + change
        )
      );
      return { ...prev, [ticketType]: newCount };
    });
  };

  const getTotalTickets = () =>
    Object.values(ticketCounts).reduce((sum, c) => sum + c, 0);

  const getTotalAmount = () =>
    data?.tickets?.reduce((sum, t) => {
      const count = ticketCounts[t.type.toLowerCase()] || 0;
      return sum + count * parseFloat(t.price);
    }, 0) || 0;

  const proceedToAttendees = () => {
    if (getTotalTickets() === 0) {
      alert('Please select at least one ticket');
      return;
    }
    setCurrentScreen('attendees');
  };

  const goBackToTickets = () => setCurrentScreen('tickets');

  const handleAttendeeChange = (ticketNum, field, value) => {
    setAttendeesData((prev) => ({
      ...prev,
      [`${ticketNum}_${field}`]: value,
    }));
  };

  const validateForm = () => {
    const totalTickets = getTotalTickets();
    const requiredFields = ['name', 'email', 'phone'];

    for (let i = 1; i <= totalTickets; i++) {
      for (const field of requiredFields) {
        const value = attendeesData[`${i}_${field}`];
        if (!value || !value.trim()) return false;
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
      const attendees = [];
      let ticketNumber = 1;

      for (const t of data.tickets) {
        const count = ticketCounts[t.type.toLowerCase()] || 0;
        for (let i = 0; i < count; i++) {
          attendees.push({
            name: attendeesData[`${ticketNumber}_name`],
            email: attendeesData[`${ticketNumber}_email`],
            phone: attendeesData[`${ticketNumber}_phone`],
            gender: attendeesData[`${ticketNumber}_gender`] || null,
            ticket: t.id,
          });
          ticketNumber++;
        }
      }

      await registerForEvent(eventId, attendees);
      alert('Booking successful! Tickets will be emailed/WhatsApped.');
      closeBooking();
      navigate()
    } catch (err) {
      console.error(err);
      alert('Error while booking tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeBooking = () => {
    const resetCounts = {};
    data?.tickets?.forEach((t) => (resetCounts[t.type.toLowerCase()] = 0));
    setTicketCounts(resetCounts);
    setAttendeesData({});
    setCurrentScreen('tickets');
  };

  const renderAttendeeForm = (ticketNumber, ticketType) => (
    <div key={ticketNumber} className="bg-black/20 backdrop-blur-sm mb-6 p-6 border border-gray-600 rounded-xl">
      <h3 className="flex items-center gap-3 mb-6 font-bold text-red-500 text-lg">
        <div className="bg-red-500 rounded w-5 h-5"></div>
        Ticket #{ticketNumber} - {ticketType}
      </h3>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <div>
          <label className="text-white">Name *</label>
          <input
            type="text"
            value={attendeesData[`${ticketNumber}_name`] || ''}
            onChange={(e) => handleAttendeeChange(ticketNumber, 'name', e.target.value)}
            className="bg-white/10 p-2 border border-gray-600 rounded-lg w-full text-white"
          />
        </div>
        <div>
          <label className="text-white">Email *</label>
          <input
            type="email"
            value={attendeesData[`${ticketNumber}_email`] || ''}
            onChange={(e) => handleAttendeeChange(ticketNumber, 'email', e.target.value)}
            className="bg-white/10 p-2 border border-gray-600 rounded-lg w-full text-white"
          />
        </div>
        <div>
          <label className="text-white">Phone *</label>
          <input
            type="tel"
            value={attendeesData[`${ticketNumber}_phone`] || ''}
            onChange={(e) => handleAttendeeChange(ticketNumber, 'phone', e.target.value)}
            className="bg-white/10 p-2 border border-gray-600 rounded-lg w-full text-white"
          />
        </div>
        <div>
          <label className="text-white">Gender</label>
          <select
            value={attendeesData[`${ticketNumber}_gender`] || ''}
            onChange={(e) => handleAttendeeChange(ticketNumber, 'gender', e.target.value)}
            className="bg-white/10 p-2 border border-gray-600 rounded-lg w-full text-white"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );

  const generateAttendeesForms = () => {
    const forms = [];
    let ticketNumber = 1;

    for (const t of data.tickets) {
      const count = ticketCounts[t.type.toLowerCase()] || 0;
      for (let i = 0; i < count; i++) {
        forms.push(renderAttendeeForm(ticketNumber, t.type));
        ticketNumber++;
      }
    }
    return forms;
  };

  if (eventLoading) {
    return <div className="p-8 text-white">Loading event...</div>;
  }
  if (isError) {
    return <div className="p-8 text-red-500">Error loading event</div>;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black p-4 min-h-screen">
      <div className="w-full max-w-4xl">
        {currentScreen === 'tickets' && (
          <div className="bg-black/80 p-8 border border-gray-600 rounded-2xl">
            <div className="mb-8 text-center">
              <h1 className="font-bold text-white text-3xl md:text-4xl">{data?.event?.title}</h1>
              <p className="text-gray-400 text-xl">{data?.event?.description}</p>
              <p className="text-gray-500 text-sm">
                {new Date(data?.event?.start_datetime).toLocaleString()} – {new Date(data?.event?.end_datetime).toLocaleString()}
              </p>
            </div>

            <h2 className="mb-6 font-bold text-white text-2xl">Select Tickets</h2>
            {data?.tickets?.map((ticket) => {
              const typeKey = ticket.type.toLowerCase();
              return (
                <div key={ticket.id} className="bg-white/5 mb-4 p-6 border border-gray-600 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <div className="font-bold text-white text-xl">{ticket.type}</div>
                    <div className="font-bold text-red-500 text-xl">₹ {parseFloat(ticket.price).toFixed(2)}</div>
                  </div>
                  <div className="mb-4 text-gray-400 text-sm">
                    Sale: {new Date(ticket.sale_start).toLocaleString()} – {new Date(ticket.sale_end).toLocaleString()}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(typeKey, -1)}
                        disabled={ticketCounts[typeKey] === 0}
                        className="bg-red-500 px-4 py-2 rounded text-white"
                      >
                        -
                      </button>
                      <div className="bg-gray-800 px-6 py-2 rounded text-white">{ticketCounts[typeKey]}</div>
                      <button
                        onClick={() => updateQuantity(typeKey, 1)}
                        disabled={ticketCounts[typeKey] >= ticket.per_user_limit}
                        className="bg-red-500 px-4 py-2 rounded text-white"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-gray-500 text-sm">Limit: {ticket.per_user_limit} per user</div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={closeBooking}
                className="px-8 py-3 border border-gray-600 rounded-lg text-gray-400"
              >
                Close
              </button>
              <button
                onClick={proceedToAttendees}
                disabled={getTotalTickets() === 0}
                className="bg-red-600 px-8 py-3 rounded-lg text-white"
              >
                Register ({getTotalTickets()} tickets)
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'attendees' && (
          <div className="bg-black/80 p-8 border border-gray-600 rounded-2xl">
            <div className="mb-8 text-center">
              <h1 className="font-bold text-white text-3xl md:text-4xl">Attendee Information</h1>
            </div>

            <div className="bg-red-500/20 mb-8 p-6 border border-red-500 rounded-xl text-center">
              <div className="font-bold text-2xl">
                Total Amount: <span className="text-red-500">₹ {getTotalAmount().toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-8 pr-2 max-h-96 overflow-y-auto">
              {generateAttendeesForms()}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={goBackToTickets}
                className="px-8 py-3 border border-gray-600 rounded-lg text-gray-400"
              >
                Back
              </button>
              <button
                onClick={makePayment}
                className="bg-red-600 px-8 py-3 rounded-lg text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHiveBooking;

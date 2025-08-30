import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/home/EventCard';
import EventDetailModal from '@/components/home/ModalEvent';
import { getEvents } from '@/api/event';

const HomePage = () => {
    const { data: events, error, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching events: {error.message}</div>;
    }

    return (
        <>
            {/* Main Content */}
            <div className="bg-background p-6 min-h-screen text-white">
                <div className="space-y-6 mx-auto max-w-7xl">
                    {/* Events Grid */}
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onClick={() => handleCardClick(event)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-zinc-500 text-center">
                                No events found.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal - positioned outside main content but inside component */}
            <EventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
        </>
    );
};

export default HomePage;
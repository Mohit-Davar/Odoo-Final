import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/home/EventCard';
import { getEventsByProfile } from '@/api/event';
import { Button, Card, CardBody, Spinner } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
    const { data: events, error, isLoading, isError } = useQuery({
        queryKey: ['eventsProfile'],
        queryFn: getEventsByProfile,
    });

    const navigate = useNavigate();

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center bg-black min-h-screen">
                <div className="text-center">
                    <Spinner size="lg" color="primary" />
                    <p className="mt-4 text-white">Loading Events...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="flex justify-center items-center bg-black min-h-screen">
                <Card className="bg-zinc-900 border border-zinc-800 max-w-md">
                    <CardBody className="p-8 text-center">
                        <p className="mb-4 text-red-400">Error loading events</p>
                        <p className="text-zinc-400 text-sm">{error?.message}</p>
                        <Button
                            color="primary"
                            className="bg-red-600 hover:bg-red-700 mt-4"
                            onPress={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <>
            <div className="bg-black py-20 min-h-screen text-white">
                <div>
                    <div className="space-y-6 mx-auto max-w-7xl">
                        {/* Page Title */}
                        <div className="mb-12 text-center">
                            <h1 className="bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mb-4 font-bold text-primary text-6xl md:text-7xl">
                                My Events
                            </h1>
                            <p className="text-zinc-400 text-xl">Manage and view all your events</p>
                        </div>

                        {/* Events Grid */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        onClick={() => navigate("/events/edit/" + event.id)}
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
            </div>
        </>
    );
};

export default MyEvents;
import { useQuery } from '@tanstack/react-query';
import { getBookingsByUser } from '@/api/attendees';
import { Button, Card, CardBody, Spinner, Badge, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Calendar, MapPin, CreditCard, Clock, AlertCircle, RefreshCw, Download, Eye, Ticket,QrCode } from 'lucide-react';
import { useState } from 'react';

const LoadingState = () => (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black min-h-screen">
        <div className="space-y-4 text-center">
            <div className="relative">
                <Spinner size="lg" color="primary" />
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-white text-lg">Loading Your Bookings</h3>
                <p className="text-zinc-400 text-sm">Fetching your event tickets...</p>
            </div>
        </div>
    </div>
);

const ErrorState = ({ error, onRetry }) => (
    <div className="flex justify-center items-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-4 min-h-screen">
        <Card className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/60 w-full max-w-md">
            <CardBody className="space-y-6 p-8 text-center">
                <div className="flex justify-center">
                    <div className="bg-red-500/10 p-3 border border-red-500/20 rounded-full">
                        <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-white text-lg">Unable to Load Bookings</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {error?.message || 'Something went wrong while fetching your bookings.'}
                    </p>
                </div>
                <Button
                    color="primary"
                    className="bg-red-600 hover:bg-red-700 w-full transition-colors"
                    startContent={<RefreshCw className="w-4 h-4" />}
                    onPress={onRetry}
                >
                    Try Again
                </Button>
            </CardBody>
        </Card>
    </div>
);

const EmptyState = () => (
    <div className="space-y-6 py-16 text-center">
        <div className="flex justify-center">
            <div className="bg-zinc-800/50 p-4 border border-zinc-700/50 rounded-full">
                <Calendar className="w-8 h-8 text-zinc-500" />
            </div>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold text-white text-xl">No Bookings Yet</h3>
            <p className="mx-auto max-w-md text-zinc-400">
                You haven&apos;t booked any events yet. Start exploring and book your first event!
            </p>
        </div>
        <Button
            color="primary"
            className="bg-blue-600 hover:bg-blue-700 transition-colors"
            onPress={() => window.location.href = '/events'}
        >
            Browse Events
        </Button>
    </div>
);

const BookingDetailsModal = ({ booking, isOpen, onClose }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const handleDownloadTicket = () => {
        // Generate ticket content
        const ticketContent = `
EVENT TICKET
═══════════════════════════════════════

Event: ${booking.event_title}
Ticket Type: ${booking.ticket_type}
Price: ${booking.price}

Date: ${booking.event_date ? formatDate(booking.event_date) : 'TBA'}
Time: ${booking.event_time ? formatTime(booking.event_time) : 'TBA'}
Venue: ${booking.venue || 'TBA'}

Booking ID: ${booking.id}
Purchase Date: ${formatDate(booking.created_at)}

═══════════════════════════════════════
Please present this ticket at the venue
    `;

        // Create and download the ticket file
        const blob = new Blob([ticketContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${booking.event_title.replace(/\s+/g, '-')}-${booking.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!booking) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            classNames={{
                base: "bg-zinc-900 border border-zinc-800",
                header: "border-b border-zinc-800",
                body: "py-6",
                footer: "border-t border-zinc-800"
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <h3 className="font-bold text-white text-xl">{booking.event_title}</h3>
                    <p className="text-zinc-400 text-sm">Booking Details</p>
                </ModalHeader>

                <ModalBody>
                    <div className="space-y-6">
                        {/* Event Info */}
                        <div className="space-y-3 bg-zinc-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Event Information</h4>
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Event Date</div>
                                        <div className="font-medium text-white">
                                            {booking.event_date ? formatDate(booking.event_date) : 'To be announced'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Event Time</div>
                                        <div className="font-medium text-white">
                                            {booking.event_time ? formatTime(booking.event_time) : 'To be announced'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Venue</div>
                                        <div className="font-medium text-white">
                                            {booking.venue || 'To be announced'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Ticket className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Ticket Type</div>
                                        <div className="font-medium text-white">{booking.ticket_type}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Info */}
                        <div className="space-y-3 bg-zinc-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Booking Information</h4>
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-green-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Total Price</div>
                                        <div className="font-bold text-green-400 text-lg">${booking.price}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <QrCode className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Booking ID</div>
                                        <div className="font-mono text-white text-sm">{booking.id}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-orange-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Purchase Date</div>
                                        <div className="font-medium text-white">
                                            {formatDate(booking.created_at)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <div className="text-zinc-400 text-sm">Status</div>
                                        <Badge color="success" variant="flat" size="sm">
                                            Confirmed
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        {(booking.description || booking.organizer) && (
                            <div className="space-y-3 bg-zinc-800/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Additional Information</h4>
                                {booking.description && (
                                    <div>
                                        <div className="mb-1 text-zinc-400 text-sm">Event Description</div>
                                        <p className="text-white text-sm leading-relaxed">{booking.description}</p>
                                    </div>
                                )}
                                {booking.organizer && (
                                    <div>
                                        <div className="mb-1 text-zinc-400 text-sm">Organizer</div>
                                        <div className="font-medium text-white">{booking.organizer}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                        className="text-zinc-400 hover:text-white"
                    >
                        Close
                    </Button>
                    <Button
                        color="primary"
                        startContent={<Download className="w-4 h-4" />}
                        onPress={handleDownloadTicket}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Download Ticket
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const BookingCard = ({ booking, onViewDetails, onDownload }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const getTicketTypeColor = (type) => {
        const colors = {
            'VIP': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            'Premium': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            'Standard': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            'Early Bird': 'bg-green-500/10 text-green-400 border-green-500/20',
        };
        return colors[type] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    };

    return (
        <Card className="bg-zinc-900/60 hover:shadow-black/20 hover:shadow-xl backdrop-blur-sm border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300">
            <CardBody className="space-y-4 p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-white text-lg leading-tight">
                            {booking.event_title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <Chip
                                size="sm"
                                className={`${getTicketTypeColor(booking.ticket_type)} border`}
                                variant="bordered"
                            >
                                {booking.ticket_type}
                            </Chip>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-white text-2xl">
                            ₹{booking.price}
                        </div>
                    </div>
                </div>

                <div className="gap-3 grid grid-cols-1 pt-2 border-zinc-800/60 border-t">
                    <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-zinc-500" />
                        <span className="text-zinc-400">Purchased on</span>
                        <span className="font-medium text-white">
                            {formatDate(booking.created_at)}
                        </span>
                    </div>
                    {booking.event_date && (
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                            <span className="text-zinc-400">Event date</span>
                            <span className="font-medium text-white">
                                {formatDate(booking.event_date)}
                            </span>
                        </div>
                    )}
                    {booking.venue && (
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-zinc-500" />
                            <span className="text-zinc-400">Venue</span>
                            <span className="font-medium text-white">
                                {booking.venue}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 pt-2">
                    <Button
                        size="sm"
                        variant="bordered"
                        className="flex-1 hover:bg-zinc-800 border-zinc-700 text-zinc-400"
                        startContent={<Eye className="w-4 h-4" />}
                        onPress={() => onViewDetails(booking)}
                    >
                        View Details
                    </Button>
                    <Button
                        size="sm"
                        color="primary"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        startContent={<Download className="w-4 h-4" />}
                        onPress={() => onDownload(booking)}
                    >
                        Download
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

const MyBookings = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedBooking, setSelectedBooking] = useState(null);

    const { data: bookings = [], error, isLoading, isError } = useQuery({
        queryKey: ['myBookings'],
        queryFn: getBookingsByUser,
    });

    const handleRetry = () => {
        window.location.reload();
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        onOpen();
    };

    const handleDownloadTicket = (booking) => {
        // Generate ticket content
        const ticketContent = `
EVENT TICKET
═══════════════════════════════════════

Event: ${booking.event_title}
Ticket Type: ${booking.ticket_type}
Price: ${booking.price}

Date: ${booking.event_date ? new Date(booking.event_date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }) : 'TBA'}
Time: ${booking.event_time ? new Date(booking.event_time).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        }) : 'TBA'}
Venue: ${booking.venue || 'TBA'}

Booking ID: ${booking.id}
Purchase Date: ${new Date(booking.created_at).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })}

═══════════════════════════════════════
Please present this ticket at the venue
    `;

        // Create and download the ticket file
        const blob = new Blob([ticketContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${booking.event_title.replace(/\s+/g, '-')}-${booking.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return <ErrorState error={error} onRetry={handleRetry} />;
    }

    const totalSpent = bookings.reduce((sum, booking) => sum + parseFloat(booking.price || 0), 0);
    const upcomingEvents = bookings.filter(booking =>
        booking.event_date && new Date(booking.event_date) > new Date()
    );

    return (
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black min-h-screen">
            {/* Header Section */}
            <div className="bg-zinc-900/40 backdrop-blur-sm border-zinc-800/60 border-b">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
                        <div className="space-y-2">
                            <h1 className="font-bold text-white text-3xl">My Bookings</h1>
                            <p className="text-zinc-400">
                                Manage and view all your event tickets in one place
                            </p>
                        </div>

                        {bookings.length > 0 && (
                            <div className="flex gap-4">
                                <div className="bg-zinc-800/60 p-4 rounded-lg text-center">
                                    <div className="font-bold text-white text-2xl">{bookings.length}</div>
                                    <div className="text-zinc-400 text-xs uppercase tracking-wider">Total Bookings</div>
                                </div>
                                <div className="bg-zinc-800/60 p-4 rounded-lg text-center">
                                    <div className="font-bold text-green-400 text-2xl">₹{totalSpent.toFixed(2)}</div>
                                    <div className="text-zinc-400 text-xs uppercase tracking-wider">Total Spent</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                {bookings.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-6">
                        {upcomingEvents.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-semibold text-white text-xl">Upcoming Events</h2>
                                    <Badge color="primary" variant="flat" size="sm">
                                        {upcomingEvents.length}
                                    </Badge>
                                </div>
                                <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
                                    {upcomingEvents.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h2 className="font-semibold text-white text-xl">
                                {upcomingEvents.length > 0 ? 'All Bookings' : 'Your Bookings'}
                            </h2>
                            <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
                                {bookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onViewDetails={handleViewDetails}
                                        onDownload={handleDownloadTicket}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <BookingDetailsModal
                booking={selectedBooking}
                isOpen={isOpen}
                onClose={onClose}
            />
        </div>
    );
};

export default MyBookings;
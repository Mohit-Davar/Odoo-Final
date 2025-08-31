import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Chip,
    Divider,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@heroui/react';
import {
    Users,
    Eye,
    MapPin,
    Calendar,
    X,
    Share2,
    CalendarPlus,
    MessageCircle,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

// Helper function for category colors
const getCategoryColor = (category) => {
    const colors = {
        'Music': 'bg-purple-600',
        'Art': 'bg-blue-600',
        'Sports': 'bg-green-600',
        'Workshop': 'bg-yellow-600',
        'Meetup': 'bg-teal-600',
    };
    return colors[category] || 'bg-gray-600';
};

// Social sharing utilities
const createShareUrl = (platform, eventData) => {
    const { title, url } = eventData;
    const encodedTitle = encodeURIComponent(title);

    const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodeURIComponent(url)}`,
    };

    return shareUrls[platform];
};

// Calendar utilities
const createCalendarData = (event) => {
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    const formatCalendarDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return {
        title: event.title,
        description: event.description,
        location: event.location,
        startDate: formatCalendarDate(startDate),
        endDate: formatCalendarDate(endDate),
        startDateLocal: startDate,
        endDateLocal: endDate
    };
};

const createGoogleCalendarUrl = (calendarData) => {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: calendarData.title,
        dates: `${calendarData.startDate}/${calendarData.endDate}`,
        details: calendarData.description,
        location: calendarData.location
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const createOutlookCalendarUrl = (calendarData) => {
    const params = new URLSearchParams({
        subject: calendarData.title,
        startdt: calendarData.startDate,
        enddt: calendarData.endDate,
        body: calendarData.description,
        location: calendarData.location
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

const downloadICSFile = (calendarData) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your App//Event//EN
BEGIN:VEVENT
UID:${Date.now()}@yourapp.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${calendarData.startDate}
DTEND:${calendarData.endDate}
SUMMARY:${calendarData.title}
DESCRIPTION:${calendarData.description}
LOCATION:${calendarData.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${calendarData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const ShareButtons = ({ event, currentUrl }) => {
    const shareData = {
        title: event.title,
        description: event.description,
        url: currentUrl
    };

    const handleShare = (platform) => {
        const url = createShareUrl(platform, shareData);
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareOptions = [
        { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="light"
                    startContent={<Share2 size={18} />}
                    className="text-[#666666] hover:text-[#f5f5f5]"
                >
                    Share
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Share options">
                {shareOptions.map(({ key, label, icon: Icon }) => (
                    <DropdownItem
                        key={key}
                        startContent={<Icon size={16} />}
                        onPress={() => handleShare(key)}
                    >
                        {label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

const CalendarButtons = ({ event }) => {
    const calendarData = createCalendarData(event);

    const handleAddToCalendar = (type) => {
        switch (type) {
            case 'google':
                window.open(createGoogleCalendarUrl(calendarData), '_blank');
                break;
            case 'outlook':
                window.open(createOutlookCalendarUrl(calendarData), '_blank');
                break;
            case 'ics':
                downloadICSFile(calendarData);
                break;
            default:
                break;
        }
    };

    const calendarOptions = [
        { key: 'google', label: 'Google Calendar' },
        { key: 'outlook', label: 'Outlook Calendar' },
        { key: 'ics', label: 'Download ICS File' }
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="light"
                    startContent={<CalendarPlus size={18} />}
                    className="text-[#666666] hover:text-[#f5f5f5]"
                >
                    Add to Calendar
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Calendar options">
                {calendarOptions.map(({ key, label }) => (
                    <DropdownItem
                        key={key}
                        onPress={() => handleAddToCalendar(key)}
                    >
                        {label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

const EventDetailModal = ({ isOpen, onClose, event }) => {
    const navigate = useNavigate();

    if (!event) return null;

    // Format the start and end datetime for better display
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    const formattedStartDate = startDate.toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }) + ` ${startDate.getDate()} ${startDate.toLocaleString('en-GB', { month: 'short', year: "numeric" })}`;

    const formattedEndDate = endDate.toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }) + ` ${endDate.getDate()} ${endDate.toLocaleString('en-GB', { month: 'short', year: "numeric" })}`;

    const coordinates = [event.latitude, event.longitude];
    const currentUrl = `${window.location.origin}/event/${event.id}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            hideCloseButton={true}
            placement="center"
            backdrop="blur"
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-2 bg-background p-4">
                            <div className='flex justify-between items-center'>
                                {/* Category Chip */}
                                <Chip
                                    size="md"
                                    className={`${getCategoryColor(event.event_category)} text-secondary font-medium`}
                                >
                                    {event.event_category}
                                </Chip>
                                {/* Close Button */}
                                <Button
                                    isIconOnly
                                    variant="light"
                                    onPress={onClose}
                                    className="bg-background/60 hover:bg-background/80 backdrop-blur-sm text-secondary"
                                >
                                    <X size={20} />
                                </Button>
                            </div>
                            {/* Title Overlay */}
                            <div className="">
                                <h2 className="font-bold text-[#f5f5f5] text-2xl leading-tight">
                                    {event.title}
                                </h2>
                            </div>
                        </ModalHeader>

                        <ModalBody className="bg-background px-6">
                            {/* Date and Location Info */}
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex items-center gap-2 text-secondaryText">
                                    <Calendar size={18} />
                                    <span className="font-medium">{formattedStartDate} - {formattedEndDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <MapPin size={18} />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <Users size={18} />
                                    <span className="font-medium">{event.attendees} attendees</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <Eye size={18} />
                                    <span className="font-medium">{event.views} views</span>
                                </div>
                            </div>

                            {/* Action Buttons - Share and Calendar */}
                            <div className="flex items-center gap-4 mb-6">
                                <ShareButtons event={event} currentUrl={currentUrl} />
                                <CalendarButtons event={event} />
                            </div>

                            <Divider className="bg-[#666666]/30 mb-6" />

                            {/* Full Description */}
                            <div>
                                <h3 className="mb-3 font-semibold text-[#f5f5f5] text-lg">About This Event</h3>
                                <p className="text-[#666666] leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {event.images && event.images.length > 1 && (
                                <div className="mt-4">
                                    <h4 className="mb-2 font-semibold text-[#f5f5f5] text-md">Event Gallery</h4>
                                    <div className="flex gap-3 overflow-x-auto">
                                        {event.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.image_url}
                                                alt={`Event Image ${index + 1}`}
                                                className="border border-[#666666] rounded-md w-24 h-24 object-cover"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Map with Event Location */}
                            <div className="mt-6">
                                <h4 className="mb-2 font-semibold text-[#f5f5f5] text-md">Event Location</h4>
                                <MapContainer
                                    center={coordinates}
                                    zoom={13}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={coordinates}>
                                        <Popup>{event.location}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>

                            {/* Organizer Info */}
                            {event.organizer && (
                                <div className="mt-6">
                                    <h4 className="mb-2 font-semibold text-[#f5f5f5] text-md">Organizer</h4>
                                    <p className="text-[#666666]">{event.organizer}</p>
                                </div>
                            )}

                            {/* Price Info */}
                            {event.price && (
                                <div className="mt-4">
                                    <h4 className="mb-2 font-semibold text-[#f5f5f5] text-md">Price</h4>
                                    <p className="font-bold text-[#f5f5f5] text-lg">{event.price}</p>
                                </div>
                            )}
                        </ModalBody>

                        <ModalFooter className="bg-[#000203] px-6">
                            <Button
                                variant="light"
                                onPress={onClose}
                                className="text-[#666666] hover:text-[#f5f5f5]"
                            >
                                Close
                            </Button>
                            <Button
                                className="bg-[#b71e09] hover:bg-[#b71e09]/80 font-medium text-[#f5f5f5]"
                                onPress={() => {
                                    navigate("/register/event/" + event.id)
                                }}
                            >
                                Join Event
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EventDetailModal;
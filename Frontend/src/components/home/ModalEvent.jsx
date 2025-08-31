import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Chip,
    Divider,
} from '@heroui/react';
import { MapPin, Calendar, X, Share2, CalendarPlus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor } from './utils';
import formatDate from '@/lib/formatDate';

// WhatsApp
const createShareUrl = (eventData) => {
    const { title, url } = eventData;
    const encodedTitle = encodeURIComponent(title);
    return `https://wa.me/?text=${encodedTitle}%20${encodeURIComponent(url)}`;
};

// Google Calendar
const createCalendarData = (event) => {
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    const formatCalendarDate = (date) =>
        date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return {
        title: event.title,
        description: event.description,
        location: event.location,
        startDate: formatCalendarDate(startDate),
        endDate: formatCalendarDate(endDate),
    };
};

const createGoogleCalendarUrl = (calendarData) => {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: calendarData.title,
        dates: `${calendarData.startDate}/${calendarData.endDate}`,
        details: calendarData.description,
        location: calendarData.location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const ShareButtons = ({ event, currentUrl }) => {
    const handleShare = () => {
        const url = createShareUrl({ title: event.title, url: currentUrl });
        window.open(url, '_blank', 'width=600,height=400');
    };

    return (
        <Button
            variant="solid"
            radius='lg'
            color='success'
            startContent={<Share2 size={18} />}
            onPress={handleShare}
        >
            Share via WhatsApp
        </Button>
    );
};

const CalendarButtons = ({ event }) => {
    const calendarData = createCalendarData(event);

    const handleAddToCalendar = () => {
        window.open(createGoogleCalendarUrl(calendarData), '_blank');
    };

    return (
        <Button
            variant="solid"
            radius='lg'
            color='primary'
            startContent={<CalendarPlus size={18} />}
            onPress={handleAddToCalendar}
        >
            Add to Google Calendar
        </Button>
    );
};

const EventDetailModal = ({ isOpen, onClose, event }) => {
    const navigate = useNavigate();
    if (!event) return null;

    const coordinates = [event.latitude, event.longitude];
    const currentUrl = `${window.location.origin}/event/${event.id}`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" hideCloseButton placement="center" backdrop="blur" scrollBehavior="inside">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-2 bg-background p-4">
                            <div className='flex justify-between items-center'>
                                <Chip size="md" className={`${getCategoryColor(event.event_category)} text-secondary font-medium`}>
                                    {event.event_category}
                                </Chip>
                                <Button isIconOnly variant="light" onPress={onClose} className="bg-background/60 hover:bg-background/80 backdrop-blur-sm text-secondary">
                                    <X size={20} />
                                </Button>
                            </div>
                            <h2 className="font-bold text-secondary text-2xl leading-tight">{event.title}</h2>
                        </ModalHeader>

                        <ModalBody className="bg-background px-6">
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex items-center gap-2 text-secondaryText">
                                    <Calendar size={18} />
                                    <span className="font-medium">{formatDate(event.start_datetime)} - {formatDate(event.end_datetime)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-secondaryText">
                                    <MapPin size={18} />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <ShareButtons event={event} currentUrl={currentUrl} />
                                <CalendarButtons event={event} />
                            </div>

                            <Divider className="bg-secondaryText/30 mb-6" />

                            <h3 className="mb-3 font-semibold text-secondary text-lg">About This Event</h3>
                            <p className="text-secondaryText leading-relaxed">{event.description}</p>

                            <div className="mt-6">
                                <h4 className="mb-2 font-semibold text-md text-secondary">Event Location</h4>
                                <MapContainer center={coordinates} zoom={13} style={{ height: "300px", width: "100%" }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={coordinates}>
                                        <Popup>{event.location}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </ModalBody>

                        <ModalFooter className="bg-[#000203] px-6">
                            <Button variant="light" onPress={onClose} className="text-secondaryText hover:text-secondary">
                                Close
                            </Button>
                            <Button className="bg-[#b71e09] hover:bg-[#b71e09]/80 font-medium text-secondary" onPress={() => navigate("/register/event/" + event.id)}>
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

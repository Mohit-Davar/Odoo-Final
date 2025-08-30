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
import { Users, Eye, MapPin, Calendar, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

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

const EventDetailModal = ({ isOpen, onClose, event }) => {
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

                            <Divider className="bg-[#666666]/30 mb-6" />

                            {/* Full Description */}
                            <div>
                                <h3 className="mb-3 font-semibold text-[#f5f5f5] text-lg">About This Event</h3>
                                <p className="text-[#666666] leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {event.images.length > 1 && (
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
                                    // Handle join/register action
                                    console.log('Join event:', event.event_id);
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
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

// Helper function for category colors
const getCategoryColor = (category) => {
    const colors = {
        'Music': 'bg-purple-600',
        'Art': 'bg-blue-600',
        'Sports': 'bg-green-600'
    };
    return colors[category] || 'bg-gray-600';
};

const EventDetailModal = ({ isOpen, onClose, event }) => {
    if (!event) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size="2xl"
            placement="center"
            backdrop="blur"
            classNames={{
                backdrop: "bg-[#000203]/50",
                base: "bg-[#000203] border border-[#666666]/30",
                header: "border-b border-[#666666]/30",
                body: "py-6",
                footer: "border-t border-[#666666]/30"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 p-0">
                            {/* Hero Image Section */}
                            <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000203]/60 to-transparent" />
                                
                                {/* Category Chip */}
                                <div className="absolute top-4 left-4">
                                    <Chip
                                        size="md"
                                        className={`${getCategoryColor(event.category)} text-[#f5f5f5] font-medium`}
                                    >
                                        {event.category}
                                    </Chip>
                                </div>
                                
                                {/* Close Button */}
                                <Button
                                    isIconOnly
                                    variant="light"
                                    onPress={onClose}
                                    className="absolute top-4 right-4 bg-[#000203]/60 backdrop-blur-sm text-[#f5f5f5] hover:bg-[#b71e09]/80"
                                >
                                    <X size={20} />
                                </Button>
                                
                                {/* Title Overlay */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h2 className="text-2xl font-bold text-[#f5f5f5] leading-tight">
                                        {event.title}
                                    </h2>
                                </div>
                            </div>
                        </ModalHeader>

                        <ModalBody className="px-6 bg-[#000203]">
                            {/* Date and Location Info */}
                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <Calendar size={18} />
                                    <span className="font-medium">{event.date}</span>
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
                                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">About This Event</h3>
                                <p className="text-[#666666] leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Additional Details Section (if you have more data) */}
                            {event.organizer && (
                                <div className="mt-6">
                                    <h4 className="text-md font-semibold text-[#f5f5f5] mb-2">Organizer</h4>
                                    <p className="text-[#666666]">{event.organizer}</p>
                                </div>
                            )}

                            {event.price && (
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold text-[#f5f5f5] mb-2">Price</h4>
                                    <p className="text-[#f5f5f5] font-bold text-lg">{event.price}</p>
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
                                className="bg-[#b71e09] text-[#f5f5f5] hover:bg-[#b71e09]/80 font-medium"
                                onPress={() => {
                                    // Handle join/register action
                                    console.log('Join event:', event.id);
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
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
} from '@heroui/react';
import { Users, Eye, MapPin } from 'lucide-react';

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

const EventCard = ({ event, onClick }) => {
    // Choose the cover image (if exists)
    const coverImage = event.images.find((img) => img.is_cover) || event.images[0];

    const truncatedDescription = event.description.length > 100
        ? `${event.description.slice(0, 100)}...`
        : event.description;

    return (
        <Card
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
            isPressable
            onPress={() => onClick?.(event)}
        >
            <CardHeader className="p-0">
                <div className="relative rounded-t-lg w-full h-48 overflow-hidden">
                    {/* Display cover image */}
                    <img
                        src={coverImage.image_url}  // Use cover image or the first one
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="top-3 left-3 absolute">
                        <Chip
                            size="sm"
                            className={`${getCategoryColor(event.event_category)} text-white font-medium`}
                        >
                            {event.event_category}
                        </Chip>
                    </div>
                    <div className="top-3 right-3 absolute bg-primary/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="font-medium text-white text-sm">{event.start_datetime.slice(0, 10)}</span>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="space-y-4 p-4">
                <div>
                    <h3 className="mb-2 font-semibold text-white text-lg">{event.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{truncatedDescription}</p>
                </div>

                <Divider className="bg-zinc-800" />

                <div className="flex justify-between items-center gap-2">
                    {/* Location */}
                    <div className="flex items-center gap-2 max-w-64 text-zinc-500 text-sm">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                    </div>
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-zinc-500 text-sm">
                        <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>{event.attendees}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{event.views}</span>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default EventCard;

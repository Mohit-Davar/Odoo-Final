import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
} from '@heroui/react';
import { getCategoryColor } from './utils';


const EventCard = ({ event, onClick }) => {

    function formatDate(datetime) {
        const date = new Date(datetime);
        const formattedDate = ` ${date.toLocaleDateString('en-GB', { day: "numeric", month: "short", year: "numeric" })}`;
        return formattedDate
    }

    const coverImage = event.images.find((img) => img.is_cover) || event.images[0];

    const truncatedDescription = event.description.length > 100
        ? `${event.description.slice(0, 100)}...`
        : event.description;

    return (
        <Card
            className="bg-zinc-900 p-5 transition-all duration-300 cursor-pointer"
            isPressable
            onPress={() => onClick(event)}

        >
            <CardHeader className="p-0">
                <div className="relative rounded-t-lg w-full h-64 overflow-hidden">
                    <img
                        src={coverImage.image_url}
                        alt={event.title}
                        className="rounded-md w-full h-full object-bottom object-cover"
                    />
                    <div className="top-3 left-3 absolute">
                        <Chip
                            size="sm"
                            className={`${getCategoryColor(event.event_category)} text-white font-medium`}
                        >
                            {event.event_category}
                        </Chip>
                    </div>
                    <div className="top-3 right-3 absolute bg-primary/60 backdrop-blur-sm px-2 py-1 rounded-2xl">
                        <span className="font-medium text-white text-sm">
                            {formatDate(event.start_datetime)}
                        </span>

                    </div>
                </div>
            </CardHeader>

            <CardBody className="space-y-4 p-4">
                <div>
                    <h3 className="font-semibold text-white text-lg">{event.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{truncatedDescription}</p>
                </div>

                <Divider className="bg-zinc-800" />

                {/* Location */}
                <div className="text-zinc-500 text-sm">
                    <span>{event.location}</span>
                </div>
            </CardBody>
        </Card>
    );
};

export default EventCard;

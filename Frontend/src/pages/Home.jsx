import EventCard from '@/components/home/EventCard';
import {
    Pagination
} from '@heroui/react';


const HomePage = () => {
    const events = [
        {
            "id": 1,
            "title": "Live Music Festival",
            "date": "Aug 24",
            "category": "Music",
            "location": "Central Park, New York",
            "image": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
            "description": "Experience live music, local food, and beverages from emerging artists and established bands in the heart of the city. A vibrant atmosphere for all music lovers.",
            "isPublished": true,
            "attendees": 234,
            "views": 1200,
            "ticketPrice": 45.00,
            "isFree": false
        },
        {
            "id": 2,
            "title": "Jewelry Exhibition",
            "date": "Sep 17-12",
            "category": "Art",
            "location": "The Metropolitan Museum of Art, New York",
            "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop",
            "description": "A rare exhibition of exquisite jewelry pieces from different eras. Discover timeless stories and connections in the world of high art and design.",
            "isPublished": true,
            "attendees": 89,
            "views": 567,
            "ticketPrice": 25.00,
            "isFree": false
        },
        {
            "id": 3,
            "title": "Tennis Tournament",
            "date": "Jun 25",
            "category": "Sports",
            "location": "Wimbledon, London",
            "image": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",
            "description": "A professional tennis tournament featuring top international players. Witness high-stakes matches and incredible displays of skill on the court.",
            "isPublished": false,
            "attendees": 156,
            "views": 890,
            "ticketPrice": 120.00,
            "isFree": false
        },
        {
            "id": 4,
            "title": "Tennis Match",
            "date": "Jul 28",
            "category": "Sports",
            "location": "Local Community Center",
            "image": "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=250&fit=crop",
            "description": "The local championship of our community tennis club. A friendly but competitive match for all ages and skill levels.",
            "isPublished": true,
            "attendees": 78,
            "views": 445,
            "ticketPrice": null,
            "isFree": true
        },
        {
            "id": 5,
            "title": "Art Gallery Opening",
            "date": "Aug 15",
            "category": "Art",
            "location": "The Artsy Corner, Downtown",
            "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
            "description": "A contemporary art exhibition showcasing a diverse range of works from talented local artists. Enjoy a night of culture and creativity.",
            "isPublished": false,
            "attendees": 92,
            "views": 334,
            "ticketPrice": null,
            "isFree": true
        },
        {
            "id": 6,
            "title": "Summer Concert",
            "date": "Aug 30",
            "category": "Music",
            "location": "Hollywood Bowl, Los Angeles",
            "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
            "description": "An outdoor concert series featuring a lineup of popular bands and a spectacular light show. A perfect way to end the summer.",
            "isPublished": true,
            "attendees": 445,
            "views": 2100,
            "ticketPrice": 75.00,
            "isFree": false
        }
    ];

    return (
        <div className="bg-background p-6 min-h-screen text-white">
            <div className="space-y-6 mx-auto max-w-7xl">

                {/* Events Grid */}
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-zinc-500 text-center">
                            No events found.
                        </div>
                    )}
                </div>

                {/* Load More */}
                <div className="flex justify-center pt-">
                    <Pagination
                        showControls={true}
                        loop={true}
                        variant='faded'
                        initialPage={1}
                        total={10} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
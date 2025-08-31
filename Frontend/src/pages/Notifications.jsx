import { Bell, Clock } from 'lucide-react';

const demoNotifications = [
    {
        id: 1,
        message: 'Reminder: Event "Tech Conference 2025" is starting in one hour!',
        created_at: new Date(new Date().getTime() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    },
    {
        id: 2,
        message: 'Reminder: Event "Music Festival" is starting in one hour!',
        created_at: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
        id: 3,
        message: 'Reminder: Event "Art Exhibition" is starting in one hour!',
        created_at: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
];

const NotificationsPage = () => {
    return (
        <div className="py-20 min-h-screen text-white bg-black">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">Notifications</h1>
                <div className="space-y-4">
                    {demoNotifications.length > 0 ? (
                        demoNotifications.map((notification) => (
                            <div key={notification.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-start space-x-4">
                                <div className="bg-blue-500/10 p-2 rounded-full">
                                    <Bell className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white">{notification.message}</p>
                                    <div className="flex items-center text-sm text-zinc-400 mt-1">
                                        <Clock className="w-4 h-4 mr-1.5" />
                                        <span>{new Date(notification.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-zinc-500">
                            <p>You have no new notifications.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;

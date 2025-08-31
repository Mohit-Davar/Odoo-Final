export const getCategoryColor = (category) => {
    const colors = {
        'Music': 'bg-purple-600',
        'Art': 'bg-blue-600',
        'Dance': 'bg-pink-600',
        'Concert': 'bg-red-600',
        'Competition': 'bg-indigo-600',
        'Workshop': 'bg-yellow-600',
        'Standup': 'bg-green-600',
        'Theatre': 'bg-orange-600',
        'Games': 'bg-teal-600',
        'Meetup': 'bg-teal-600',
        'Other': 'bg-gray-600',
    };
    return colors[category]
};
import {
    AlertTriangle,
    BlocksIcon,
    Box,
    LayoutDashboard,
} from 'lucide-react';

export const navItems = [
    {
        text: "Dashboards",
        icon: <LayoutDashboard className="w-4 h-4" />,
        link: "/dashboards/all"
    },
    {
        text: "Devices",
        icon: <Box className="w-4 h-4" />,
        link: "/devices/all"
    },
    {
        text: "Templates",
        icon: <BlocksIcon className="w-4 h-4" />,
        link: "/templates/all"
    },
    {
        text: "Alerts",
        icon: <AlertTriangle className="w-4 h-4" />,
        link: "/alerts/all"
    }
]

export const userMenuItems = [
    {
        key: "profile",
        label: "Profile",
        to: "/profile",
        color: "primary"
    },
    {
        key: "settings",
        label: "Settings",
        to: "/settings",
        color: "primary"
    },
    {
        key: "logout",
        label: "Logout",
        to: "/logout",
        color: "danger"
    },
];
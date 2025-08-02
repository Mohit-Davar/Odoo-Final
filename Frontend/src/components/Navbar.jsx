import { useState } from 'react';
import {
    NavLink,
    useLocation,
} from 'react-router-dom';
import {
    navItems,
    userMenuItems,
} from '@/constants/navbar';
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@heroui/react';

export default function UserNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar isBordered maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
            {/* Left: Hamburger + Brand */}
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand>
                    <NavLink to="/dashboards/all" className="font-Rubik font-bold text-xl">
                        Vizibble
                    </NavLink>
                </NavbarBrand>
            </NavbarContent>

            {/* Center: Desktop Nav Links */}
            <NavbarContent className="hidden lg:flex gap-2" justify="center">
                {navItems.map(({ link, text, icon }) => (
                    <NavbarItem key={text}>
                        <NavElement link={link} text={text} icon={icon} />
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right: User Avatar */}
            <NavbarContent justify="end">
                <Dropdown>
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="primary"
                            name="Jason Hughes"
                            size="md"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu variant="solid">
                        {userMenuItems.map(({ key, label, to, color }) => (
                            <DropdownItem key={key} color={color} variant="bordered">
                                <NavLink to={to}>{label}</NavLink>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            {/* Mobile: Dropdown menu */}
            <NavbarMenu className="bg-white">
                {navItems.map(({ link, text, icon }, index) => (
                    <NavbarMenuItem
                        key={index}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <NavElement
                            link={link}
                            text={text}
                            icon={icon}
                            setIsMenuOpen={setIsMenuOpen}
                        />
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

function NavElement({ link, text, icon }) {
    const location = useLocation();
    const isActive = location.pathname === link;

    return (
        <Button
            as={NavLink}
            to={link}
            radius="full"
            color="primary"
            variant={isActive ? "solid" : "ghost"}
            className="border-0 w-full"
        >
            {icon}
            {text}
        </Button>
    );
}  
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarItem,
} from "@heroui/react";
import { Bell, Calendar, LogOut, PlusCircle, Ticket, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/api/users";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")}>
      <h1 className="mb-2 font-bold text-white text-3xl">
        Event<span className="text-red-500">Hive</span>
      </h1>
      <div className="bg-gradient-to-r from-red-500 to-red-600 mx-auto w-16 h-0.5"></div>
    </div>
  );
};

export default function Header() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getUserProfile,
  });

  const navigate = useNavigate();



  const renderAuthContent = () => {
    // Show a loading state with a skeleton avatar
    if (isLoading) {
      return (
        <Avatar
          isBordered
          as="div"
          className="transition-transform animate-pulse"
          color="primary"
          size="sm"
        />
      );
    }

    // Render the user dropdown if user data exists
    if (user) {
      return (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={user.name}
              size="sm"
              src={user.avatar_url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="bordered" color="primary">
            <DropdownItem key="profile" className="gap-2 h-14" isReadOnly>
              <p className="font-semibold text-primary">Signed in as</p>
              <p className="font-semibold text-primary">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="profile" startContent={<User className="w-4 h-4" />} textValue="Profile">
              Profile
            </DropdownItem>
            <DropdownItem key="create_event" startContent={<PlusCircle className="w-4 h-4" />} textValue="Create New Event">
            <Link to="/events/new">Create New Event</Link> 
            </DropdownItem>
            <DropdownItem key="my_events" startContent={<Calendar className="w-4 h-4" />} textValue="My Events">
              My Events
            </DropdownItem>
            <DropdownItem key="my_bookings" startContent={<Ticket className="w-4 h-4" />} textValue="My Bookings">
              My Bookings
            </DropdownItem>
            <DropdownItem key="notifications" startContent={<Bell className="w-4 h-4" />} textValue="Notifications">
              Notifications
            </DropdownItem>
            <DropdownItem key="logout" color="danger" className="text-danger" startContent={<LogOut className="w-4 h-4" />} textValue="Log Out">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <Button color="primary" onPress={() => navigate("/login")}>
        Login
      </Button>
    );
  };

  return (
    <Navbar className="bg-background">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {renderAuthContent()}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
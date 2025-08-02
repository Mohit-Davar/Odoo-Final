import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function UserLayout() {
    return (
        <>
            <Navbar />
            <main
                className="flex flex-grow bg-primary p-6 overflow-y-auto scrollbar-none"
                style={{ height: "calc(100vh - 64px)" }}
            >
                <Outlet />
            </main>
            <Footer className="mt-auto" />
        </>
    );
};
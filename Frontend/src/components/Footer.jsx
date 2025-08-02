import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
} from 'react-leaflet';
import { BrutalButton } from '@/components/ui/Button';
import { links } from '@/constants/footer';

export default function Footer() {
    const position = [30.757003647065353, 76.76671725767129];
    return (
        <footer className="flex md:flex-row flex-col gap-10 md:gap-2 px-8 py-16 w-full font-Poppins">
            <section className="md:max-w-[40%]">
                <h2 className="font-Rubik text-3xl">Let&apos;s Talk</h2>
                <p className="my-4">
                    Empowering industries with smart IoT solutions. Monitor, analyze, and optimize your machinery and processes with real-time data insights. Let&apos;s build a smarter, more efficient future together!
                </p>
                <a
                    href="https://www.vizibble.in"
                    target="_blank"
                    rel='noopener noreferrer'
                >
                    <BrutalButton>
                        Tell us about your problem
                    </BrutalButton>
                </a>
            </section>
            <div className="space-y-2 links">
                {links.map(({ icon, href, text }) => {
                    return (
                        <div className="flex items-center gap-2" key={text}>
                            <span>
                                {icon}
                            </span>
                            <a href={href} className="text-blue-500 hover:text-blue-800 text-sm transition-colors duration-100" target="_blank">
                                {text}
                            </a>
                        </div>
                    )
                })}
            </div>
            <div className="z-0 relative w-full md:w-96 h-56 md:h-40 map">
                <MapContainer
                    center={position}
                    zoom={15}
                    scrollWheelZoom={true}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>Technology Enabling Centre, Chandigarh</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </footer>
    )
}
import { Inter } from 'next/font/google';
import Worker from '@/components/Worker';
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <div className={`flex flex-col min-h-screen ${inter.className} bg-gradient-to-b from-gray-800 to-gray-700 text-white`}>
            <main className="flex-grow flex flex-col items-center justify-between p-24">
                <div className="z-10 max-w-4xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <Worker />
                </div>
            </main>
            <Footer />
        </div>
    );
}

import {Inter} from 'next/font/google';
import Worker from '@/components/Worker';
import Footer from '@/components/Footer';

const inter = Inter({subsets: ['latin']});

export default function Home() {
    return (
        <div
            className={`relative flex flex-col min-h-screen ${inter.className} bg-gradient-to-b from-gray-900
                to-gray-700 text-white`}>
            <div className="absolute top-[120px] left-0 w-full z-0 overflow-hidden"
                 style={{height: 'calc(100% - 120px)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1000" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#aaf" stopOpacity=".04"/>
                            <stop offset="100%" stopColor="#aaf" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#waveGradient)" d="M0,128L48,144C96,160,192,192,288,218.7C384,245,480,267,576,
                        272C672,277,768,267,864,245.3C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,
                        224L1440,1000L0,1000Z"></path>
                </svg>
            </div>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-between p-24 pb-5">
                <div className="max-w-4xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <Worker/>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

import {Inter} from 'next/font/google';
import WorkerInteraction from '@/components/WorkerInteraction';

const inter = Inter({subsets: ['latin']});

export default function Home() {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-gray-800 text-white`}>
            <div className="z-10 max-w-4xl w-full items-center justify-between font-mono text-sm lg:flex">
                <WorkerInteraction/>
            </div>
        </main>
    );
}

import '@/styles/globals.css';
import '../fontawesome';
import type {AppProps} from 'next/app';

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;

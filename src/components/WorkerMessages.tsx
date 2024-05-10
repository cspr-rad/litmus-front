import {useState, useEffect} from 'react';

interface MessageEvent {
    type: string;
    data?: any;
}

interface UpdateStateData {
    trustedHash?: string;
    fetchProgress?: number;
    validateProgress?: number;
    status?: 'processing' | 'completed';
}

interface MessageState {
    type: 'info' | 'success' | 'error';
    message: string;
}

export function WorkerMessages() {
    const [message, setMessage] = useState<MessageState | null>(null);
    const [processStarted, setProcessStarted] = useState(false);
    const [fetchProgress, setFetchProgress] = useState(0);
    const [validateProgress, setValidateProgress] = useState(0);
    const [trustedHash, setTrustedHash] = useState<string>('');

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const {data} = event;
            if (!data) return;

            switch (data.type) {
                case 'LM_MESSAGE':
                    setMessage({type: data.message.type, message: data.message.text});
                    break;
                case 'UPDATE_STATE':
                    setTrustedHash(prev => data.data.trustedHash ?? prev);
                    setFetchProgress(prev => data.data.fetchProgress ?? prev);
                    setValidateProgress(prev => data.data.validateProgress ?? prev);
                    setProcessStarted(data.data.status === 'processing');
                    if (data.data.status === 'completed') {
                        console.log('Validation completed');
                        setProcessStarted(false);
                    }
                    break;
                default:
                    console.log(`Unhandled message type: ${data.type}`);
            }
        };

        navigator.serviceWorker.addEventListener('message', handleMessage);
        return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
    }, []);

    return {
        message, processStarted, fetchProgress, validateProgress, trustedHash,
        setMessage, setProcessStarted, setTrustedHash
    };
}

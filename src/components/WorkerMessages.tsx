import {useEffect, useState} from 'react';
import {WorkerState} from '@/components/common/interfaces';

export interface MessageEvent {
    type: string;
    data?: any;
}

export function WorkerMessages() {
    const [workerState, setWorkerState] = useState<WorkerState>({
        trusted_hash: '',
        fetch_progress: 0,
        validate_progress: 0,
        status: 'idle',
        message: null,
    });

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const {data} = event;
            if (!data) return;
            switch (data.type) {
                case 'LM_MESSAGE':
                    setWorkerState(prevState => ({
                        ...prevState,
                        message: {type: data.message.type, message: data.message.text},
                    }));
                    if (data.message.type === 'error') {
                        setWorkerState(prevState => ({
                            ...prevState,
                            status: 'error',
                        }));
                    }
                    break;
                case 'UPDATE_STATE':
                    setWorkerState(prevState => ({
                        ...prevState,
                        ...data.data,
                    }));
                    break;
                default:
                    console.log(`Unhandled message type: ${data.type}`);
            }
        };

        navigator.serviceWorker.addEventListener('message', handleMessage);
        return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
    }, []);

    return {workerState, setWorkerState};
}

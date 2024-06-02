import { useState, useEffect } from 'react';

interface MessageEvent {
    type: string;
    data?: any;
}

interface MessageState {
    type: 'info' | 'success' | 'error';
    message: string;
}

export interface WorkerState {
    trusted_hash: string;
    trusted_block?:{ era: number; block_height: number };
    last_validated?: { era: number; block_height: number };
    blocks_to_process?: number;
    fetch_progress: number;
    fetch_eta?: number;
    validate_progress: number;
    validate_eta?: number;
    message: MessageState | null;
    status: 'idle' | 'processing' | 'error';
    validators_records_count?: number;
    validated_eras?: { minEra: number; maxEra: number };
    validated_block_heights?: { minBlockHeight: number; maxBlockHeight: number };
    total_rpcs?: number;
    available_rpcs?: number;
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
            const { data } = event;
            if (!data) return;
            switch (data.type) {
                case 'LM_MESSAGE':
                    setWorkerState(prevState => ({
                        ...prevState,
                        message: { type: data.message.type, message: data.message.text },
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

    return { workerState, setWorkerState };
}

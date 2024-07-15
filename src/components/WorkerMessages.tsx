import { useEffect, useState } from 'react';
import { WorkerState } from '@/components/common/interfaces';

export interface MessageEvent {
    type: string;
    data?: any;
}

export function WorkerMessages() {
    const [workerState, setWorkerState] = useState<WorkerState>({
        fetch_progress: 0,
        validate_progress: 0
    });

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { data } = event;
            if (!data) return;
            if (data.type === 'UPDATE_STATE') {
                setWorkerState(prevState => ({
                    ...prevState,
                    ...data.data,
                }));
            }
        };

        navigator.serviceWorker.addEventListener('message', handleMessage);
        return () => navigator.serviceWorker.removeEventListener('message', handleMessage);
    }, []);

    return { workerState, setWorkerState };
}

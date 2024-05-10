import React, {useEffect} from 'react';
import ProgressBar from '@/components/ProgressBar';
import HashForm from '@/components/HashForm';
import Message from '@/components/Message';
import {WorkerMessages} from './WorkerMessages';
import {registerServiceWorker} from "@/components/RegisterWorker";

const WorkerInteraction: React.FC = () => {
    const {
        message, processStarted, fetchProgress, validateProgress, trustedHash,
        setMessage, setProcessStarted, setTrustedHash
    } = WorkerMessages();

    const clearMessage = () => {
        setMessage(null);
        setProcessStarted(false);
    };

    useEffect(() => {
        registerServiceWorker();
    }, []);

    return (
        <div className="flex flex-col w-full p-4">
            <HashForm
                trustedHash={trustedHash}
                clearMessage={clearMessage}
                disabled={processStarted}
                onHashChange={setTrustedHash}
            />
            {message && <Message type={message.type} message={message.message}/>}
            {processStarted && (
                <div className="mt-4">
                    <ProgressBar title="Fetching blocks" progress={fetchProgress}/>
                    <ProgressBar title="Validating blocks" progress={validateProgress}/>
                </div>
            )}
        </div>
    );
};

export default WorkerInteraction;

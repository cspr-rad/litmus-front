import React, {useEffect, useState} from 'react';
import ProgressBar from '@/components/ProgressBar';
import HashForm from '@/components/HashForm';
import Message from '@/components/Message';
import {WorkerMessages} from './WorkerMessages';
import {registerServiceWorker} from "@/components/RegisterWorker";
import Logo from "@/components/Logo";

const WorkerInteraction: React.FC = () => {
    const {
        message, processStarted, fetchProgress, validateProgress, trustedHash,
        setMessage, setProcessStarted, setTrustedHash
    } = WorkerMessages();
    const [showMessage, setShowMessage] = useState(false);

    const clearMessage = () => {
        setShowMessage(false);
        setMessage(null);
        setProcessStarted(false);
    };

    useEffect(() => {
        if (message) {
            setShowMessage(true);
        }
    }, [message]);

    useEffect(() => {
        registerServiceWorker();
    }, []);

    return (
        <>
            {message && <Message type={message.type} message={message.message} onClose={clearMessage}/>}
            <div className="flex flex-col w-full p-4 items-center">
                <Logo/>
                <HashForm
                    trustedHash={trustedHash}
                    clearMessage={clearMessage}
                    disabled={processStarted}
                    onHashChange={setTrustedHash}
                />
                {processStarted && (
                    <div className="mt-4 w-full">
                        <ProgressBar title="Fetching blocks" progress={fetchProgress}/>
                        <ProgressBar title="Validating blocks" progress={validateProgress}/>
                    </div>
                )}
            </div>
        </>
    );
};

export default WorkerInteraction;

import React, {useEffect, useState} from 'react';
import Message from '@/components/Message';
import {WorkerMessages} from './WorkerMessages';
import {registerServiceWorker} from '@/components/RegisterWorker';
import Logo from '@/components/Logo';
import Tabs from '@/components/Tabs';
import BlockValidation from '@/components/BlockValidation';
import AccountValidation from '@/components/AccountValidation';
import Documentation from '@/components/Documentation';

const Worker: React.FC = () => {
    const {workerState, setWorkerState} = WorkerMessages();
    const {message} = workerState;

    const clearMessage = () => {
        setWorkerState(prevState => ({
            ...prevState,
            message: null
        }));
    };

    useEffect(() => {
        registerServiceWorker();
    }, []);

    useEffect(() => {
        setWorkerState(prevState => ({
            ...prevState,
            trusted_hash: ''
        }));
    }, [setWorkerState]);

    const handleSwitchBlockHash = () => {
        setWorkerState(prevState => ({
            ...prevState,
            trusted_hash: '51f0093b921aa532a56ced21f6927339bbdfd9161d8708fe46c87370a11963ed'
        }));
    };

    const [activeTab, setActiveTab] = useState<string>('main');

    return (
        <>
            {message && <Message type={message.type} message={message.message} onClose={clearMessage}/>}
                <div className="flex-grow flex flex-col w-full p-4 items-center">
                    <Logo/>
                    <Tabs activeTab={activeTab} onTabChange={setActiveTab}/>
                    <div className="w-full p-6 py-9 rounded-md rounded-tl-none bg-panel shadow-xl">
                        {activeTab === 'block' ? (
                            <BlockValidation
                                workerState={workerState}
                                setWorkerState={setWorkerState}
                                handleSwitchBlockHash={handleSwitchBlockHash}
                                clearMessage={clearMessage}
                            />
                        ) : activeTab === 'account' ? (
                            <AccountValidation/>
                        ) : (
                            <Documentation/>
                        )}
                    </div>
                </div>
        </>
    )
        ;
};

export default Worker;

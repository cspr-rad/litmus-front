import React, {useEffect, useState} from 'react';
import Message from '@/components/Message';
import {WorkerMessages} from '@/components/WorkerMessages';
import {registerServiceWorker} from '@/components/RegisterWorker';
import Logo from '@/components/Logo';
import Tabs from '@/components/Tabs';
import BlockValidation from '@/components/BlockValidation';
import AccountValidation from '@/components/AccountValidation';
import Documentation from '@/components/Documentation';
import styles from '@/components/styles/Worker.module.scss';

const Worker: React.FC = () => {
    const {workerState, setWorkerState} = WorkerMessages();
    const {message} = workerState;
    const [activeTab, setActiveTab] = useState<string>('block');

    const clearMessage = () => {
        setWorkerState(prevState => ({
            ...prevState,
            message: null
        }));
    };

    useEffect(() => {
        registerServiceWorker();
    }, []);

    return (
        <>
            {message && <Message type={message.type} message={message.message} onClose={clearMessage}/>}
            <div className={styles.main}>
                <Logo/>
                <Tabs activeTab={activeTab} onTabChange={setActiveTab}/>
                <div className={styles.content}>
                    {activeTab === 'block' ? (
                        <BlockValidation
                            workerState={workerState}
                            setWorkerState={setWorkerState}
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
    );
};

export default Worker;

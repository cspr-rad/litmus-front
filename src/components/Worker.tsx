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
import MerkleValidation from '@/components/MerkleValidation';

const Worker: React.FC = () => {
    const {workerState, setWorkerState} = WorkerMessages();
    const [activeTab, setActiveTab] = useState<string>('block');

    const clearMessage = () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                target: 'litmus-worker',
                command: 'dismissMessage'
            });
        } else {
            console.log('Service worker controller not available.');
        }
    };

    useEffect(() => {
        registerServiceWorker();
    }, []);

    return (
        <>
            {workerState.error && <Message type="error" message={workerState.error} onClose={clearMessage}/>}
            {workerState.info && <Message type="info" message={workerState.info} onClose={clearMessage}/>}
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
                        <AccountValidation workerState={workerState}/>
                    ) : activeTab === 'merkle' ? (
                        <MerkleValidation workerState={workerState}/>
                    ) : (
                        <Documentation/>
                    )}
                </div>
            </div>
        </>
    );
};

export default Worker;

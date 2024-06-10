import React from 'react';
import HashForm from '@/components/HashForm';
import Info from '@/components/Info';
import ProgressBar from '@/components/ProgressBar';
import ActionsBar from '@/components/ActionsBar';
import {WorkerState} from '@/components/common/interfaces';

interface BlockValidationProps {
    workerState: WorkerState;
    setWorkerState: React.Dispatch<React.SetStateAction<WorkerState>>;
    clearMessage: () => void;
}

const BlockValidation: React.FC<BlockValidationProps> = ({workerState, setWorkerState, clearMessage}) => {
    const handleGetLastBlock = () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                target: 'litmus-worker',
                command: 'getLastBlock',
            });
        } else {
            console.log('Service worker controller not available.');
        }
    };

    return (
        <>
            <HashForm
                trustedHash={workerState.trusted_hash}
                clearMessage={clearMessage}
                disabled={workerState.status === 'processing'}
                onHashChange={(hash) => setWorkerState(prev => ({...prev, trustedHash: hash}))}
            />
            <ActionsBar onGetLastBlock={handleGetLastBlock}/>
            <Info workerState={workerState}/>
            {workerState.status === 'processing' && (
                <div className="mt-4 w-full">
                    <ProgressBar title="Fetched" progress={workerState.fetch_progress}
                                 blocks={workerState.fetch_blocks} eta={workerState.fetch_eta}/>
                    <ProgressBar title="Validated" progress={workerState.validate_progress}
                                 blocks={workerState.validate_blocks} eta={workerState.validate_eta}/>
                </div>
            )}
        </>
    );
};

export default BlockValidation;

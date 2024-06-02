import React from 'react';
import HashForm from '@/components/HashForm';
import Info from '@/components/Info';
import ProgressBar from '@/components/ProgressBar';
import ActionsBar from '@/components/ActionsBar';
import { WorkerState } from './WorkerMessages';

interface MainContentProps {
    workerState: WorkerState;
    setWorkerState: React.Dispatch<React.SetStateAction<WorkerState>>;
    handleSwitchBlockHash: () => void;
    clearMessage: () => void;
}

const BlockValidation: React.FC<MainContentProps> = ({ workerState, setWorkerState, handleSwitchBlockHash, clearMessage }) => (
    <>
        <HashForm
            trustedHash={workerState.trusted_hash}
            clearMessage={clearMessage}
            disabled={workerState.status === 'processing'}
            onHashChange={(hash) => setWorkerState(prev => ({ ...prev, trustedHash: hash }))}
        />
        <ActionsBar onSwitchBlockHash={handleSwitchBlockHash} />
        <Info workerState={workerState} />
        {workerState.status === 'processing' && (
            <div className="mt-4 w-full">
                <ProgressBar title="Fetching" progress={workerState.fetch_progress} blocks={workerState.blocks_to_process} eta={workerState.fetch_eta} />
                <ProgressBar title="Validating" progress={workerState.validate_progress} blocks={workerState.blocks_to_process} eta={workerState.validate_eta} />
            </div>
        )}
    </>
);

export default BlockValidation;
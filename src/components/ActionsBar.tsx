import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice, faRemove} from '@fortawesome/free-solid-svg-icons';
import {WorkerMessages} from "@/components/WorkerMessages";

interface ActionsBarProps {
    onSwitchBlockHash: () => void;
}

const ActionsBar: React.FC<ActionsBarProps> = ({onSwitchBlockHash}) => {
    const {workerState, setWorkerState} = WorkerMessages();
    const isDisabled = workerState.status === 'processing';

    return (
        <div className="w-full pt-3 pb-5 text-xs flex space-x-2">
            <button
                type="submit"
                className={`btn btn-secondary bg-actions-bar-button text-white py-2 px-3 rounded flex items-center hover:bg-actions-bar-button-hover ${isDisabled ? 'cursor-not-allowed' : ''}`}
                disabled={isDisabled}
                style={{opacity: isDisabled ? 0.5 : 1}}
                onClick={onSwitchBlockHash}
            >
                <FontAwesomeIcon icon={faDice} className="me-2 text-yellow-400 text-lg"/>
                <span>Some switch block hash</span>
            </button>
            <button
                type="submit"
                className={`btn btn-secondary bg-actions-bar-button text-white py-2 px-3 rounded flex items-center hover:bg-actions-bar-button-hover ${isDisabled ? 'cursor-not-allowed' : ''}`}
                disabled={isDisabled}
                style={{opacity: isDisabled ? 0.5 : 1}}
            >
                <FontAwesomeIcon icon={faRemove} className="me-2 text-red-400 text-lg"/>
                <span>Delete database</span>
            </button>
        </div>
    );
};

export default ActionsBar;
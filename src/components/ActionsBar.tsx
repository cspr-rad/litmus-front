import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {WorkerMessages} from '@/components/WorkerMessages';
import styles from '@/components/styles/ActionsBar.module.scss';

interface ActionsBarProps {
    onGetLastBlock: () => void;
}

const ActionsBar: React.FC<ActionsBarProps> = ({onGetLastBlock}) => {
    const {workerState, setWorkerState} = WorkerMessages();
    const isDisabled = workerState.status === 'processing';

    return (
        <div className="w-full pt-3 pb-5 text-xs flex space-x-2">
            <button
                type="submit"
                className={`${styles.button} ${isDisabled ? 'cursor-not-allowed' : ''}`}
                disabled={isDisabled}
                style={{opacity: isDisabled ? 0.5 : 1}}
                onClick={onGetLastBlock}
            >
                <FontAwesomeIcon icon={faSearch} className="me-2"/>
                <span>Find last switch block</span>
            </button>
        </div>
    );
};

export default ActionsBar;
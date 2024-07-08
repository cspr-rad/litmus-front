import React, {useState} from 'react';
import styles from '@/components/styles/AccountValidation.module.scss';
import Info from '@/components/Info';
import {WorkerState} from '@/components/common/interfaces';

interface MerkleValidationProps {
    workerState: WorkerState;
}

const MerkleValidation: React.FC<MerkleValidationProps> = ({workerState}) => {
    const [merkleInput, setMerkleInput] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                target: 'litmus-worker',
                command: 'validateMerkle',
                merkle: merkleInput,
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className="text-gray-300 px-4 mb-2">
                    Enter a Merkle proof for decoding. The only currently supported method is "query_global_state".
                </p>
                <textarea
                    onChange={(event) => setMerkleInput(event.target.value)}
                    className={'w-full bg-gray-800 p-4 text-gray-200'} style={{height: '400px'}}
                    placeholder="Merkle proof"
                    value={merkleInput}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={'hover:bg-blue-700'}
                    >
                        Validate
                    </button>
                </div>
            </form>
            <Info workerState={workerState} scope={'merkle'}/>
        </>
    );
};

export default MerkleValidation;

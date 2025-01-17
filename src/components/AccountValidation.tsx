import React, {useState} from 'react';
import styles from '@/components/styles/AccountValidation.module.scss';
import Info from '@/components/Info';
import {WorkerState} from '@/components/common/interfaces';

const isHex = (value: string, minLength: number, maxLength: number) =>
    /^[0-9a-fA-F]+$/.test(value) && value.length >= minLength && value.length <= maxLength;

const isPublicKey = (value: string) => isHex(value, 66, 68);
const isBlockHash = (value: string) => isHex(value, 64, 64);
const isInteger = (value: string) => /^\d+$/.test(value) && parseInt(value, 10) >= 0;

const validateInputs = (account: string, block: string): boolean => {
    const isAccountValid = isPublicKey(account);
    const isBlockValid = block === '' || isInteger(block) || isBlockHash(block);
    return isAccountValid && isBlockValid;
};

interface AccountValidationProps {
    workerState: WorkerState;
}

const AccountValidation: React.FC<AccountValidationProps> = ({workerState}) => {
    const [accountInput, setAccountInput] = useState<string>('');
    const [blockInput, setBlockInput] = useState<string>('');
    const [isInputValid, setIsInputValid] = useState<boolean>(false);

    const handleAccountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAccountInput(value);
        setIsInputValid(validateInputs(value, blockInput));
    };

    const handleBlockInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBlockInput(value);
        setIsInputValid(validateInputs(accountInput, value));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isInputValid) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    target: 'litmus-worker',
                    command: 'validateAccount',
                    account: accountInput,
                    block: blockInput,
                });
            }

        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Account public key"
                    value={accountInput}
                    onChange={handleAccountInputChange}
                />
                <input
                    type="text"
                    placeholder="Block height or hash (optional, last block by default)"
                    value={blockInput}
                    onChange={handleBlockInputChange}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={!isInputValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                        disabled={!isInputValid}
                    >
                        Validate
                    </button>
                </div>
            </form>
            <Info workerState={workerState} scope={'account'}/>
        </>
    );
};

export default AccountValidation;

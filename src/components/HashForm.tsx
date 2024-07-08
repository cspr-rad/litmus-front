import React, {useEffect, useRef, useState} from 'react';
import styles from '@/components/styles/HashForm.module.scss';

interface HashFormProps {
    trustedHash: string;
    clearMessage: () => void;
    disabled?: boolean;
    onHashChange: (newHash: string) => void;
}

const HashForm: React.FC<HashFormProps> = ({trustedHash, clearMessage, disabled, onHashChange}) => {
    const [hash, setHash] = useState(trustedHash || '');
    const [isValidHash, setIsValidHash] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setHash(trustedHash || '');
        validateHash(trustedHash);
    }, [trustedHash]);

    const validateHash = (inputHash: string) => {
        const isValid = /^[a-fA-F0-9]{64}$/.test(inputHash);
        setIsValidHash(isValid);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHash = event.target.value;
        setHash(newHash);
        validateHash(newHash);
        if (isValidHash) {
            onHashChange(newHash);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearMessage();
        sendMessageToWorker(hash);
    };

    const sendMessageToWorker = (hash: string) => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                target: 'litmus-worker',
                command: 'setTrustedBlockHash',
                trusted_block_hash: hash,
            });
        } else {
            console.log('Service worker controller not available.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                ref={inputRef}
                type="text"
                value={hash}
                placeholder="Trusted Switch Block Hash"
                disabled={disabled}
                onChange={handleInputChange}
                aria-label="Enter trusted block hash"
            />
            <button
                type="submit"
                className={!isValidHash || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                disabled={!isValidHash || disabled}
            >
                Start
            </button>
        </form>
    );
};

export default HashForm;

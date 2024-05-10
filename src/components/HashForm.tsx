import React, {useEffect, useRef, useState} from 'react';

interface HashFormProps {
    trustedHash: string;
    clearMessage: () => void;
    disabled?: boolean;
    onHashChange: (newHash: string) => void
}

const HashForm: React.FC<HashFormProps> = ({trustedHash, clearMessage, disabled, onHashChange}) => {
    const [hash, setHash] = useState(trustedHash);
    const [isValidHash, setIsValidHash] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setHash(trustedHash);
    }, [trustedHash]);

    // 64 characters long hex
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

    const handleButtonClick = () => {
        clearMessage();
        sendMessageToWorker(hash);
    };

    const sendMessageToWorker = (hash: string) => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                target: 'litmus-worker',
                command: 'startFetching',
                trusted_block_hash: hash,
            });
        } else {
            console.log('Service worker controller not available.');
        }
    };

    return (
        <div className="flex w-full mb-2">
            <input
                ref={inputRef}
                type="text"
                value={hash}
                placeholder="Trusted Block Hash"
                disabled={disabled}
                onChange={handleInputChange}
                className="input flex-1 mr-2 py-2 px-8 text-black"
                aria-label="Enter trusted block hash"  // Improved accessibility
            />
            <button onClick={handleButtonClick}
                    className={`btn btn-primary bg-blue-500 text-white font-bold py-4 px-12
                        ${!isValidHash || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    disabled={!isValidHash || disabled}>
                Start
            </button>
        </div>
    );
};

export default HashForm;

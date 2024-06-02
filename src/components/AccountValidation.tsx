import React, {useState} from 'react';

const isHex = (value: string, minLength: number, maxLength: number) =>
    /^[0-9a-fA-F]+$/.test(value) && value.length >= minLength && value.length <= maxLength;

const isPublicKey = (value: string) => isHex(value, 66, 68);
const isAccountHash = (value: string) => isHex(value, 64, 64);
const isBlockHash = (value: string) => isHex(value, 64, 64);
const isInteger = (value: string) => /^\d+$/.test(value) && parseInt(value, 10) >= 0;

const validateInputs = (account: string, block: string): boolean => {
    const isAccountValid = isPublicKey(account) || isAccountHash(account);
    const isBlockValid = block === '' || isInteger(block) || isBlockHash(block);
    return isAccountValid && isBlockValid;
};

const AccountValidation: React.FC = () => {
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
            console.log('Form is valid and submitted', accountInput, blockInput);

        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full mb-2 space-y-4">
            <input
                type="text"
                placeholder="Account (hex or hash)"
                value={accountInput}
                onChange={handleAccountInputChange}
                className="input w-full py-4 px-8 text-black outline-none"
            />
            <input
                type="text"
                placeholder="Block height or hash (optional, last block by default)"
                value={blockInput}
                onChange={handleBlockInputChange}
                className="input w-full py-4 px-8 text-black outline-none"
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className={`btn btn-primary bg-blue-500 text-white font-bold py-4 px-12
                    ${!isInputValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    disabled={!isInputValid}
                >
                    Validate
                </button>
            </div>
        </form>
    );
};

export default AccountValidation;

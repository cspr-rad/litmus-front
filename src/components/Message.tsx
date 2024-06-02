import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export type MessageType = 'info' | 'success' | 'error';

interface MessageProps {
    type: MessageType;
    message: string;
    onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ type, message, onClose }) => {
    const styles = {
        info: {
            backgroundColor: 'bg-blue-200',
            textColor: 'text-blue-950'
        },
        success: {
            backgroundColor: 'bg-green-200',
            textColor: 'text-green-950'
        },
        error: {
            backgroundColor: 'bg-red-200',
            textColor: 'text-red-950'
        }
    };
    const { backgroundColor, textColor } = styles[type];

    return (
        <div className={`fixed top-0 left-0 right-0 w-full transition-transform duration-500 ${message ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className={`flex justify-between items-center w-full px-8 py-4 ${backgroundColor} ${textColor}`}>
                <div className="flex items-center">
                    <span className="font-bold mr-2">{type.toUpperCase()}:</span>
                    {message}
                </div>
                <button onClick={onClose} className="text-xl font-bold ml-4">
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </div>
        </div>
    );
};

export default Message;

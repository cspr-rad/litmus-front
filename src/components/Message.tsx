import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/styles/Message.module.scss';
import {MessageType} from '@/components/common/interfaces';

interface MessageProps {
    type: MessageType;
    message: string;
    onClose: () => void;
}

const Message: React.FC<MessageProps> = ({type, message, onClose}) => {
    return (
        <div
            className={`${styles.container} ${message ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className={`${styles.box} ${styles[type]}`}>
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

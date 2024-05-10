import React from 'react';

export type MessageType = 'info' | 'success' | 'error';
interface MessageProps {
    type: MessageType;
    message: string;
}

const Message: React.FC<MessageProps> = ({type, message}) => {
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
        <div className="w-full">
            <div className={`px-8 py-4 ${backgroundColor} ${textColor}`}>
                <span className="font-bold me-2">{type.toUpperCase()}:</span>
                {message}
            </div>
        </div>
    );
};

export default Message;
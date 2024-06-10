import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface HashDisplayProps {
    hash: string;
}

const HashDisplay: React.FC<HashDisplayProps> = ({hash}) => {
    const formattedHash = `${hash.slice(0, 5)}...${hash.slice(-5)}`;
    return (
        <>
            <span className="ms-2">{formattedHash}</span>
            <CopyToClipboard text={hash}>
                <FontAwesomeIcon icon={faCopy} className="ms-1" title="Copy to clipboard"/>
            </CopyToClipboard>
        </>
    );
};

export default HashDisplay;

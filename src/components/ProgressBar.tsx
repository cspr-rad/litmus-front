import React from 'react';
import styles from '@/components/styles/ProgressBar.module.scss';

interface ProgressBarProps {
    title: string;
    progress: number;
    blocks?: number;
    eta?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, progress, blocks = 0, eta = 0 }) => {
    const formattedETA = formatETA(eta);

    return (
        <div className="w-full mt-4">
            <div className={ styles.caption }>
                <span className="me-4">{ title } { blocks } blocks&hellip;</span>
                { progress === 100 && <span className={ styles.done }>Done</span> }
                { progress > 20 && progress < 100 && <span className={ styles.eta }>~{ `${ formattedETA }` }</span> }
            </div>
            <div className={ styles.bar }>
                <div
                    className={ styles.progress }
                    style={ { width: `${ progress }%` } }
                ></div>
            </div>
        </div>
    );
};

function formatETA(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${ minutes }m ${ seconds }s` : `${ seconds }s`;
}

export default ProgressBar;

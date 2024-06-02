import React from 'react';

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
            <div className="mb-1 flex justify-between items-center">
                <div>
                    {title} {blocks} blocks&hellip;
                    {progress === 100 && <span className="text-green-400 ms-2">Done</span>}
                </div>
                {progress > 20 && progress < 100 && <span className="ms-2 text-gray-400">~{`${formattedETA}`}</span>}
            </div>
            <div className="w-full bg-gray-700 h-8">
                <div
                    className="bg-blue-500 h-8 transition-all duration-200 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

function formatETA(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export default ProgressBar;

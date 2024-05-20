import React from 'react';

interface ProgressBarProps {
    title: string;
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, progress }) => {
    return (
        <div className="w-full mt-6">
            <div className="mb-1">
                {title}&hellip;
                {progress === 100 && <span className="text-green-400 ms-2">Done</span>}
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

export default ProgressBar;

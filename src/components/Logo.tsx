import React from 'react';

const Logo: React.FC = () => {
    return (
        <div className="w-full pb-8">
            <h1 className="text-6xl font-bold text-red-500">litmus</h1>
            <p className="text-gray-200 ms-3 text-xs">
                Casper light client
            </p>
        </div>
    );
};

export default Logo;

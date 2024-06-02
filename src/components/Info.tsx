import React from 'react';
import { WorkerState } from './WorkerMessages';

interface InfoProps {
    workerState: WorkerState;
}

const Info: React.FC<InfoProps> = ({ workerState }) => {
    return (
        <div className="w-full p-8 bg-info-block">
            <p className="text-info-item pb-1">
                Status:
                <span className="text-bold text-gray-300 ms-1 capitalize">
                    {workerState.status}
                </span>
            </p>
            {workerState.trusted_block && (
                <p className="text-info-item pb-1">
                    Trusted block era:
                    <span className="text-bold text-gray-300 ms-1">
                        {workerState.trusted_block.era}
                    </span>
                </p>
            )}
            {workerState.validators_records_count !== undefined && (
                <p className="text-info-item pb-1">
                    Weights records in db:
                    <span className="text-bold text-gray-300 ms-1">
                        {workerState.validators_records_count}
                    </span>
                </p>
            )}
            {workerState.validated_eras &&
                (workerState.validated_eras.minEra > 0 || workerState.validated_eras.maxEra > 0) && (
                    <p className="text-info-item pb-1">
                        Validated eras:
                        <span className="text-bold text-gray-300 ms-1">
                        {workerState.validated_eras.minEra} &mdash; {workerState.validated_eras.maxEra}
                    </span>
                    </p>
                )}
            {workerState.last_validated && workerState.last_validated.era > 0 && (
                <p className="text-info-item pb-1">
                    Last validated:
                    <span className="text-bold text-gray-300 ms-1">
                        {workerState.last_validated.era} ({workerState.last_validated.block_height})
                    </span>
                </p>
            )}
            {workerState.total_rpcs !== undefined && workerState.available_rpcs !== undefined && (
                <p className="text-info-item pb-1">
                    Available RPCs:
                    <span className="text-bold text-gray-300 ms-1">
                        {workerState.available_rpcs} of {workerState.total_rpcs}
                    </span>
                </p>
            )}
        </div>
    );
};

export default Info;

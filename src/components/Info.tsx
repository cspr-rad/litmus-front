import React from 'react';
import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import HashDisplay from '@/components/HashDisplay';
import {WorkerState} from '@/components/common/interfaces';
import styles from '@/components/styles/Info.module.scss';

interface InfoProps {
    workerState: WorkerState;
}

const Info: React.FC<InfoProps> = ({workerState}) => {
    return (
        <div className={styles.info}>
            <div className={styles.item}>
                Status:
                <span className="capitalize">
                    {workerState.status}
                </span>
            </div>
            {workerState.last_block?.header && (
                <div className={styles.item}>
                    Last block:
                    <span>
                         {workerState.last_block.header.height} (Era&nbsp;{workerState.last_block.header.era_id})
                    </span>
                </div>
            )}
            <div className={styles.item}>
                Trusted block:
                {workerState.trusted_block && (
                    <span>
                        {workerState.trusted_block.block_height} (Era&nbsp;{workerState.trusted_block.era})
                        <HashDisplay hash={workerState.trusted_block.block_hash}/>
                    </span>
                )}
                {!workerState.trusted_block && (
                    <span>
                        None
                    </span>
                )}
            </div>
            {workerState.last_switch_block && (
                <div className={styles.item}>
                    Last switch block:
                    <span>
                        {workerState.last_switch_block.header.height}{' '}
                        (Era&nbsp;{workerState.last_switch_block.header.era_id})
                        <a href={'https://cspr.live/block/' + workerState.last_switch_block.hash}
                           target="_blank">
                            Check&nbsp;height&nbsp;&amp;&nbsp;hash
                            <FontAwesomeIcon icon={faExternalLink} className="ms-2"/>
                        </a>
                    </span>
                </div>
            )}
            {workerState.validators_records_count !== undefined && (
                <div className={styles.item}>
                    Weights records in db:
                    <span>
                        {workerState.validators_records_count}
                    </span>
                </div>
            )}
            {workerState.validated_eras &&
                (workerState.validated_eras.minEra > 0 || workerState.validated_eras.maxEra > 0) && (
                    <div className={styles.item}>
                        Validated eras:
                        <span>
                            {workerState.validated_eras.minEra} &mdash; {workerState.validated_eras.maxEra}
                        </span>
                    </div>
                )}
            {workerState.last_validated && workerState.last_validated.era > 0 && (
                <div className={styles.item}>
                    Last validated:
                    <span>
                        {workerState.last_validated.block_height} (Era&nbsp;{workerState.last_validated.era})
                    </span>
                </div>
            )}
            {workerState.total_rpcs !== undefined && workerState.available_rpcs !== undefined && (
                <div className={styles.item}>
                    Available RPCs:
                    <span>
                        {workerState.available_rpcs} of {workerState.total_rpcs}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Info;

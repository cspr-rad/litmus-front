import React from 'react';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HashDisplay from '@/components/HashDisplay';
import { WorkerState } from '@/components/common/interfaces';
import styles from '@/components/styles/Info.module.scss';

interface InfoProps {
    workerState: WorkerState;
    scope: 'block' | 'account' | 'merkle';
}

const Info: React.FC<InfoProps> = ({ workerState, scope }) => {
    const {
        status,
        last_block,
        trusted_block,
        last_switch_block,
        last_validated,
        total_rpcs,
        available_rpcs,
        balance_CSPR,
        balance_motes,
        account,
        account_state_root_hash,
        merkle_proof_parsed
    } = workerState;

    const formatBalance = (balance: string): string => {
        return parseFloat(balance).toLocaleString(
            'en-US',
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        );
    };

    const convertedMerkleProof = mapToObject(merkle_proof_parsed);
    const formattedMerkleProof = JSON.stringify(convertedMerkleProof, null, 2);

    return (
        <div className={ styles.info }>
            { status && (
                <div className={ styles.item }>
                    Status: <span className="capitalize">{ status }</span>
                </div>
            ) }

            { scope === 'block' && last_block?.header && (
                <div className={ styles.item }>
                    Last block:
                    <span>
                        { last_block.header.height } (Era&nbsp;{ last_block.header.era_id })
                    </span>
                </div>
            ) }

            { scope === 'block' && trusted_block && (
                <div className={ styles.item }>
                    Trusted block:
                    <span>
                        { trusted_block.header.height } (Era&nbsp;{ trusted_block.header.era_id })
                        <HashDisplay hash={ trusted_block.hash }/>
                    </span>
                </div>
            ) }

            { scope === 'block' && last_switch_block?.header && (
                <div className={ styles.item }>
                    Last switch block:
                    <span>
                        { last_switch_block.header.height } (Era&nbsp;{ last_switch_block.header.era_id })
                        <a href={ `https://cspr.live/block/${ last_switch_block.hash }` } target="_blank"
                           rel="noopener noreferrer">
                            Check&nbsp;height&nbsp;&amp;&nbsp;hash
                            <FontAwesomeIcon icon={ faExternalLink } className="ms-2"/>
                        </a>
                    </span>
                </div>
            ) }

            { scope === 'block' && last_validated && last_validated?.era > 0 && (
                <div className={ styles.item }>
                    Last validated:
                    <span>
                        { last_validated.block_height } (Era&nbsp;{ last_validated.era })
                    </span>
                </div>
            ) }

            { scope === 'account' && account && (
                <div className={ styles.item }>
                    Validated account:
                    <span>
                        <HashDisplay hash={ account }/>
                    </span>
                </div>
            ) }

            { scope === 'account' && account_state_root_hash && (
                <div className={ styles.item }>
                    State root hash:
                    <span>
                        <HashDisplay hash={ account_state_root_hash }/>
                    </span>
                </div>
            ) }

            { scope === 'account' && balance_motes !== undefined && balance_CSPR && (
                <div className={ styles.item }>
                    Validated balance:
                    <span>
                        <b className={ 'text-green-500' }>
                            { formatBalance(String(balance_CSPR)) } CSPR
                        </b>
                        <small> ({ balance_motes } mote)</small>
                    </span>
                </div>
            ) }

            { total_rpcs !== undefined && available_rpcs !== undefined && (
                <div className={ styles.item }>
                    Available RPCs:
                    <span>
                        { available_rpcs } of { total_rpcs }
                    </span>
                </div>
            ) }

            { scope === 'merkle' && merkle_proof_parsed !== undefined && (
                <div className={ styles.item }>
                    Decoded Merkle Proof:
                    <pre>
                        { formattedMerkleProof }
                    </pre>
                </div>
            ) }
        </div>
    );
};

function mapToObject(map: any): any {
    if (map instanceof Map) {
        const obj: any = {};
        map.forEach((value, key) => {
            obj[key] = mapToObject(value);
        });
        return obj;
    } else if (Array.isArray(map)) {
        return map.map(item => mapToObject(item));
    } else {
        return map;
    }
}

export default Info;
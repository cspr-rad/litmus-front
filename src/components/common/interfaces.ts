export type MessageType = 'info' | 'success' | 'error';

export interface WorkerState {
    last_block?: any;
    trusted_block?: any;
    trusted_hash: string;
    last_validated?: { era: number; block_height: number };
    fetch_blocks?: number;
    validate_blocks?: number;
    fetch_progress: number;
    fetch_eta?: number;
    validate_progress: number;
    validate_eta?: number;
    status?: 'idle' | 'processing' | 'searching' | 'error';
    last_switch_block?: any | null;
    validated_eras?: { minEra: number; maxEra: number };
    validated_block_heights?: { minBlockHeight: number; maxBlockHeight: number };
    total_rpcs?: number;
    available_rpcs?: number;
    account? : string;
    balance_CSPR?: number;
    balance_motes?: string;
    account_state_root_hash?: string;
    merkle_proof_parsed?: object;
    error?: string;
    info?: string;
}

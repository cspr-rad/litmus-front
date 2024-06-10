export interface MessageState {
    type: MessageType;
    message: string;
}

export type MessageType = 'info' | 'success' | 'error';

export interface WorkerState {
    last_block?: any | null; // TODO: Define type
    trusted_hash: string;
    trusted_block?: { era: number; block_height: number; block_hash: string };
    last_validated?: { era: number; block_height: number };
    fetch_blocks?: number;
    validate_blocks?: number;
    fetch_progress: number;
    fetch_eta?: number;
    validate_progress: number;
    validate_eta?: number;
    message: MessageState | null;
    status: 'idle' | 'processing' | 'searching' | 'error';
    last_switch_block?: any | null; // TODO: Define type
    validators_records_count?: number;
    validated_eras?: { minEra: number; maxEra: number };
    validated_block_heights?: { minBlockHeight: number; maxBlockHeight: number };
    total_rpcs?: number;
    available_rpcs?: number;
}

import React from 'react';
import styles from '@/components/styles/Tabs.module.scss';

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({activeTab, onTabChange}) => (
    <div className={styles['tabs-container']}>
        <button
            className={`${styles['tab-button']} ${activeTab === 'block' ? styles.active : ''}`}
            onClick={() => onTabChange('block')}
        >
            Blocks validation
        </button>
        <button
            className={`${styles['tab-button']} ${activeTab === 'account' ? styles.active : ''}`}
            onClick={() => onTabChange('account')}
        >
            Account balance validation
        </button>
        <button
            className={`${styles['tab-button']} ${activeTab === 'merkle' ? styles.active : ''}`}
            onClick={() => onTabChange('merkle')}
        >
            Merkle proof validation
        </button>
        <button
            className={`${styles['tab-button']} ${activeTab === 'docs' ? styles.active : ''}`}
            onClick={() => onTabChange('docs')}
        >
            Documentation
        </button>
    </div>
);

export default Tabs;

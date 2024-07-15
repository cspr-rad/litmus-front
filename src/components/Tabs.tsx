import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/styles/Tabs.module.scss';

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleTabClick = (tab: string) => {
        onTabChange(tab);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const tabList = [
        { key: 'block', label: 'Blocks validation' },
        { key: 'account', label: 'Account balance validation' },
        { key: 'merkle', label: 'Merkle proof validation' },
        { key: 'docs', label: 'Documentation' },
    ];

    const activeLabel = tabList.find(tab => tab.key === activeTab)?.label || '';

    return (
        <div className={styles['tabs-container']}>
            <div className="block md:hidden" ref={dropdownRef}>
                <button
                    onClick={handleToggle}
                    className={`${styles['dropdown-toggle']} ${styles['active']}`}
                >
                    {activeLabel} <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {isOpen && (
                    <div className={styles['dropdown-menu']}>
                        {tabList
                            .filter(tab => tab.key !== activeTab)
                            .map(tab => (
                                <button
                                    key={tab.key}
                                    className={styles['tab-button']}
                                    onClick={() => handleTabClick(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                    </div>
                )}
            </div>
            <div className="hidden md:flex">
                {tabList.map(tab => (
                    <button
                        key={tab.key}
                        className={`${styles['tab-button']} ${activeTab === tab.key ? styles.active : ''}`}
                        onClick={() => onTabChange(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;

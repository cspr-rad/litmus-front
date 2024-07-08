import React, {useEffect, useState} from 'react';
import {marked} from 'marked';
import styles from '@/components/styles/Documentation.module.scss';

const Documentation: React.FC = () => {
    const url = '/README.md';
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(url);
                const markdown = await response.text();
                const html = await marked(markdown);
                setContent(html);
            } catch (error) {
                console.error('Error fetching the markdown file:', error);
            }
        };

        fetchMarkdown();
    }, [url]);

    return (
        <div className={styles.documentation}
             dangerouslySetInnerHTML={{__html: content}}
        />
    );
};

export default Documentation;

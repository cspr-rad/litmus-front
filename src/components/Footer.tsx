import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import styles from '@/components/styles/Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer
            className={styles.footer}>
            <div className="flex-1">
                <p>
                    <FontAwesomeIcon icon={faGithub}/>
                    <a className="ms-1" href="https://github.com/cspr-rad/litmus">Litmus</a><br/>
                    <FontAwesomeIcon icon={faGithub}/>
                    <a className="ms-1" href="https://github.com/cspr-rad/litmus-wasm">Litmus Wasm</a><br/>
                    <FontAwesomeIcon icon={faGithub}/>
                    <a className="ms-1" href="https://github.com/cspr-rad/litmus-worker">Litmus Worker</a><br/>
                    <FontAwesomeIcon icon={faGithub}/>
                    <a className="ms-1" href="https://github.com/cspr-rad/litmus-front">Litmus Front</a>
                </p>
            </div>
            <div className="flex-1 text-right">
                <p className="mt-2">Casper R&amp;D</p>
                <p><a href="https://casper.network">Casper Network</a></p>
                <p>2024 &copy;</p>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full p-6 bg-litmus-gray-blue text-sm flex justify-between border-t-gray-900 border-t text-gray-400 px-12 bg-gray-800">
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

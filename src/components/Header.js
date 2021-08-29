import React from  'react';
import './Header.css';
import nLogo from '../assets/netflix-logo-5.png';
import nAvatar from '../assets/netflix-avatar.png';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header-logo'>
                <img src={nLogo}></img>
            </div>
            <div className='header-avatar'>
                <img src={nAvatar}></img>
            </div>
        </header>
    )
}
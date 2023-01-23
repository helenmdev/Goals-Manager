import React from 'react';
import Logo from '../Images/Logo.svg';
import '../StyleSheets/Header.css';

const Header = () => {
  return (
    <div>
        <div>
          Header
          <img 
            src={Logo} 
            className='logo-img' 
            alt='Logo'>
          </img>
        </div>
    </div>
  )
}

export default Header
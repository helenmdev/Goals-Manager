import React from 'react';
import { MdStairs as LogoIcon } from 'react-icons/md';
import { FaUserAlt as UserIcon } from 'react-icons/fa';
import { GiHamburgerMenu as HamburguerIcon } from 'react-icons/gi';
import '../../StyleSheets/Header.css';

const Header = ({click}) => {

  return (
    <>
      <nav className='header-bg'>
        <HamburguerIcon className='icon hamb-icon' onClick={click}/>
        <div className='logo-bg'>
          <LogoIcon className='logo'/>
          <a href='/'>Goals</a>
        </div>
        <UserIcon className='icon' />
      </nav>
    </>
  )
}

export default Header
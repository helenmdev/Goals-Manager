import { Link } from 'react-router-dom';
import React from 'react';
import '../StyleSheets/Main.css';
import {HiOutlineClipboardList as ListIcon} from 'react-icons/hi';
import {IoMdAddCircleOutline as AddIcon} from 'react-icons/io';

const Main = ({children, menuVisible}) => {

  return (
    <div className='main-content'>
      <nav className={menuVisible?'sidebar':'sidebar-hide'} >
        <Link to="/list" className='side-link'>
          <div className='side-icon' ><ListIcon /></div><div className='sidebar-text'>Goals List</div></Link>
        <Link to='/new' className='side-link'><div className='side-icon'><AddIcon /></div><div className='sidebar-text'>New Goal</div></Link>
      </nav>
      <div className='main-content-goal'>
        {children}
      </div>
    </div>
  )
}

export default Main
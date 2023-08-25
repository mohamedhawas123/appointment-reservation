import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Navbar = ({name}) => {
  const handleLogout = () => {

    localStorage.clear();

  };

  

  return (
    <div className="navbar">
    {name === 'Home' ? <Link to='/'>{name}</Link> :  <Link to='/list' >{name}</Link>}
      <Link to='/login' onClick={handleLogout} >Logout</Link>
    </div>
  );
};

export default Navbar;

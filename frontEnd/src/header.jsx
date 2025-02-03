
import React from 'react';
import './header.css';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/planify.ico" alt="Logo" />
      </div>
      <h1>
        PLANIFY
      </h1>
      <div className="user-info">
        <span>Bonjour, </span>
        <button className='btn btn-danger'>Déconnexion</button>
      </div>
    </header>
  );
}

export default Header;

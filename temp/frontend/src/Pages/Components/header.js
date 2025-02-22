import React from 'react';
import './header.css';
import logo from "../Images/Logo.svg";
function Header(){
    return(
        <div className="header">
            <img src={logo} alt="Logo" class="logo" />
            <span className="text"><b>GLOW.</b></span>
        </div>


    );
}

export default Header;

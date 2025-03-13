import React, { useState, useEffect } from 'react';
import './header.css';
import logo from "../Images/Logo.svg";
import profile_picture from "../Images/profile-circle.svg";
import { useNavigate } from 'react-router-dom';

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Run only once on mount to check authentication status
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []); // Empty dependency array ensures this runs once on mount

    const handleSignOut = () => {
        localStorage.removeItem('authToken'); // Remove token to log out
        setIsAuthenticated(false); // Update state
        navigate('/'); // Redirect to the landing page
    };

    return (
        <div className="header">
            <div className='header-logo-container'>
                <img src={logo} alt="Logo" height={40} width={40} className="logo" />
                <a href="/" className="text"><b>GLOW.</b></a>
            </div>
            {isAuthenticated && (
                <div className="authed-user-icons">
                    <button className="authed-user-button" onClick={() => navigate('/SavedRoutines')}>
                        <img src={profile_picture} alt='Profile' height={50} width={50} className='profile-picture' />
                    </button>
                    <button className='authed-user-button' onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
        </div>
    );
}

export default Header;

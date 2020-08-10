import React from 'react';
import { Link } from 'react-router-dom';

{/*TODO To convert to navbar*/}
const Header = () => {
    return (
        <header>
        <h1>Moolah Banking App</h1>
        <div className="links">
            <Link to="/account" className="link">
            Account
            </Link>
        <Link to="/profile" className="link">
            Profile
        </Link>
        <Link to="/logout" className="link">
            Logout
        </Link>
        </div>
        </header>
    );
};

export default Header;
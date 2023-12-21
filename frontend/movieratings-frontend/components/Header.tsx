import Link from 'next/link';
import React from 'react';

export const Header: React.FC = () => {
    var isLoggedIn = false;
    if (typeof window !== 'undefined' && sessionStorage.getItem('token') != null) {
        isLoggedIn = true;
    }
    return (
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav" style={{marginLeft: '20px'}}>
            <li className="nav-item">
                <Link href="/" className="nav-link">
                    Home
                </Link>
            </li>
                {isLoggedIn && (
                    <li className="nav-item-active">
                        <Link href="/users" className="nav-link">
                            Users
                        </Link>
                    </li>
                )}
                <li className="nav-item">
                    <Link href="/users/addUser" className="nav-link">
                        Add user
                    </Link>
                </li>
                {isLoggedIn && (
                    <li className="nav-item-active">
                        <Link href="/directors" className="nav-link">
                            Directors
                        </Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li className="nav-item-active">
                        <Link href="/directors/addDirector" className="nav-link">
                            Add director
                        </Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li className="nav-item-active">
                        <Link href="/actors" className="nav-link">
                            Actors
                        </Link>
                    </li>
                )} 

                {!isLoggedIn && (
                    <li className="nav-item">
                        <Link href="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li className="nav-item">
                        <Link href="/logout" className="nav-link">
                            Logout
                        </Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li className="nav-item" style={{marginTop: '7px'}}>
                        <a className="nav-item" >
                            Hello, {sessionStorage.getItem('email')}
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;


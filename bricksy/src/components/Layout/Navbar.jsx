import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Layout.css';
import logo from "../../assets/images/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Layout({ children }) {
  return (
    <>
      {/* ✅ Navbar */}
      <nav className='nav'>
        <div className='container nav-inner'>
          <Link to='/' className='brand'>
            <img src={logo} alt="Logo" />
          </Link>
          <div className='links'>
            <NavLink to='/' end>Home</NavLink>
            <NavLink to='/property'>Property</NavLink>
            <NavLink to='/favorites'>Favorites</NavLink>
            <NavLink to='/compare'>Compare</NavLink>
            <NavLink to='/messages'>Messages</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Signup</NavLink>
          </div>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <main className='main'>{children}</main>

      {/* ✅ Sobha Style Footer */}
      <footer className='sobha-footer'>
        <div className="footer-top">
          <span className="line"></span>
          <div className="footer-logo">
            BRICKSY<br /><small>REALTY</small>
          </div>
          <span className="line"></span>
        </div>

        <div className="footer-social">
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-tiktok"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-twitter"></i>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()}. BRICKSY REALTY, ALL RIGHTS RESERVED.</p>
          <div className="footer-links">
            <a href="#">PRIVACY POLICY</a>
            <span>|</span>
            <a href="#">SITEMAP</a>
          </div>
        </div>
      </footer>
    </>
  );
}

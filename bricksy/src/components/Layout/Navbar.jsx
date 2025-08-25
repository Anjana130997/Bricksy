// UPDATED: guardClick now redirects to /login preserving `from` and removed alerts; exposes children via main area
import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';
import logo from '../../assets/images/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar({ children }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const guardClick = (e, dest) => {
    if (!isAuthenticated) {
      e?.preventDefault();
      navigate('/login', { state: { from: dest || location }, replace: true });
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <img src={logo} alt="Logo" />
          </Link>

          <div className="links">
            <NavLink to="/" end className={({isActive})=>isActive?'active':''}>Home</NavLink>

            {/* Public link to property listing is guarded by route; here we redirect to login if needed */}
            <NavLink to="/property" onClick={(e) => guardClick(e, { pathname: '/property' })}>Property</NavLink>

            <NavLink to="/favorites" onClick={(e) => !isAuthenticated && guardClick(e, { pathname: '/favorites' })} className={!isAuthenticated ? 'disabled-link' : ''}>
              Favorites
            </NavLink>

            <NavLink to="/compare" onClick={(e) => !isAuthenticated && guardClick(e, { pathname: '/compare' })} className={!isAuthenticated ? 'disabled-link' : ''}>
              Compare
            </NavLink>

            <NavLink to="/messages" onClick={(e) => !isAuthenticated && guardClick(e, { pathname: '/messages' })} className={!isAuthenticated ? 'disabled-link' : ''}>
              Messages
            </NavLink>

            {!isAuthenticated ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            ) : (
              <>
                <span className="nav-welcome">Welcome, {user?.name}</span>
                <button className="nav-logout" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main">{children}</main>

      <footer className="sobha-footer">
        <div className="footer-top">
          <span className="line"></span>
          <div className="footer-logo">BRICKSY<br /><small>REALTY</small></div>
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

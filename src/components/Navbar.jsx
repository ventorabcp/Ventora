import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { bndLogo } from '../assets/images';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollTo = (id) => {
    setOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand */}
        <Link to="/" className="brand" onClick={() => scrollTo('home')}>
          <img src={bndLogo} alt="VENTORA Brand New Day Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className={`nav-links ${open ? 'open' : ''}`} id="mainNav">
          {['home', 'about', 'events', 'contact'].map((id) => (
            <button
              key={id}
              className="nav-link"
              onClick={() => scrollTo(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

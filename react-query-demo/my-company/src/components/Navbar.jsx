import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const logoStyle = {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '2rem'
  };

  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'all 0.3s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#3498db',
    color: '#ffffff'
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          🏢 Our Company
        </Link>
        
        <ul style={navLinksStyle}>
          <li>
            <Link 
              to="/" 
              style={isActive('/') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = '#34495e';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ecf0f1';
                }
              }}
            >
              Home
            </Link>
          </li>
          
          <li>
            <Link 
              to="/about" 
              style={isActive('/about') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/about')) {
                  e.target.style.backgroundColor = '#34495e';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/about')) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ecf0f1';
                }
              }}
            >
              About
            </Link>
          </li>
          
          <li>
            <Link 
              to="/services" 
              style={isActive('/services') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/services')) {
                  e.target.style.backgroundColor = '#34495e';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/services')) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ecf0f1';
                }
              }}
            >
              Services
            </Link>
          </li>
          
          <li>
            <Link 
              to="/contact" 
              style={isActive('/contact') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/contact')) {
                  e.target.style.backgroundColor = '#34495e';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/contact')) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ecf0f1';
                }
              }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

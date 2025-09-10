function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      padding: '40px 20px 20px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              color: '#3498db', 
              marginBottom: '15px',
              fontSize: '1.2rem'
            }}>
              🏢 Our Company
            </h3>
            <p style={{ 
              lineHeight: '1.6',
              color: '#bdc3c7'
            }}>
              Delivering excellence in technology consulting, market analysis, 
              and product development since 1990.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ 
              color: '#3498db', 
              marginBottom: '15px',
              fontSize: '1.2rem'
            }}>
              Quick Links
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Home
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/about" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  About Us
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/services" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Services
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/contact" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ 
              color: '#3498db', 
              marginBottom: '15px',
              fontSize: '1.2rem'
            }}>
              Contact Info
            </h3>
            <div style={{ color: '#bdc3c7', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '8px' }}>
                📍 123 Business Street, New York, NY 10001
              </div>
              <div style={{ marginBottom: '8px' }}>
                📞 +1 (555) 123-4567
              </div>
              <div style={{ marginBottom: '8px' }}>
                ✉️ info@ourcompany.com
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 style={{ 
              color: '#3498db', 
              marginBottom: '15px',
              fontSize: '1.2rem'
            }}>
              Follow Us
            </h3>
            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              {['📘', '🐦', '💼', '📷'].map((icon, index) => (
                <div
                  key={index}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#34495e',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#3498db';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#34495e';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid #34495e',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#95a5a6'
        }}>
          <p style={{ margin: 0 }}>
            © 2024 Our Company. All rights reserved. | Built with React & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#d4edda',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#155724', marginBottom: '15px' }}>
            Thank You!
          </h2>
          <p style={{ color: '#155724' }}>
            Your message has been sent successfully. We'll get back to you soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#2c3e50',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Contact Us
        </h1>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#555',
          marginBottom: '40px'
        }}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {/* Contact Form */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                style={{ 
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '20px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '40px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>
              Get in Touch
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📍</div>
              <strong>Address:</strong><br />
              123 Business Street<br />
              New York, NY 10001
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📞</div>
              <strong>Phone:</strong><br />
              +1 (555) 123-4567
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>✉️</div>
              <strong>Email:</strong><br />
              info@ourcompany.com
            </div>
            
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🕒</div>
              <strong>Business Hours:</strong><br />
              Mon - Fri: 9:00 AM - 6:00 PM<br />
              Sat: 10:00 AM - 4:00 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

function Services() {
  const services = [
    {
      title: "Technology Consulting",
      description: "Expert guidance on digital transformation and technology strategy",
      icon: "💻",
      color: "#3498db"
    },
    {
      title: "Market Analysis",
      description: "Comprehensive market research and competitive intelligence",
      icon: "📊",
      color: "#e74c3c"
    },
    {
      title: "Product Development",
      description: "End-to-end product development from concept to market launch",
      icon: "🚀",
      color: "#27ae60"
    },
    {
      title: "Business Strategy",
      description: "Strategic planning and business optimization solutions",
      icon: "🎯",
      color: "#f39c12"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing and brand development",
      icon: "📱",
      color: "#9b59b6"
    },
    {
      title: "Training & Support",
      description: "Professional training programs and ongoing technical support",
      icon: "🎓",
      color: "#1abc9c"
    }
  ];

  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#2c3e50',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Our Services
        </h1>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#555',
          marginBottom: '50px',
          maxWidth: '600px',
          margin: '0 auto 50px auto'
        }}>
          We offer a comprehensive range of professional services designed to 
          help your business thrive in today's competitive marketplace.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {services.map((service, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: '#ffffff',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                border: `3px solid ${service.color}`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                {service.icon}
              </div>
              
              <h3 style={{ 
                color: service.color,
                textAlign: 'center',
                marginBottom: '15px',
                fontSize: '1.3rem'
              }}>
                {service.title}
              </h3>
              
              <p style={{ 
                color: '#555',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {service.description}
              </p>
              
              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <button style={{
                  backgroundColor: service.color,
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;

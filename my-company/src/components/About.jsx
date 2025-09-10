function About() {
  return (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      backgroundColor: '#ffffff'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '30px',
        borderBottom: '3px solid #3498db',
        paddingBottom: '10px'
      }}>
        About Us
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>Our History</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            Our company has been providing top-notch services since 1990. 
            Founded with a vision to transform industries through innovation, 
            we have grown from a small startup to a global leader.
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>Our Expertise</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            We specialize in various fields including technology consulting, 
            market analysis, and product development. Our multidisciplinary 
            approach ensures comprehensive solutions.
          </p>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        backgroundColor: '#ecf0f1',
        padding: '40px',
        borderRadius: '10px'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Our Mission</h3>
        <p style={{ 
          fontSize: '1.1rem', 
          fontStyle: 'italic',
          color: '#555',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          "To empower businesses worldwide with innovative solutions that drive 
          sustainable growth and create lasting value for all stakeholders."
        </p>
      </div>

      <div style={{
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#3498db' 
          }}>30+</div>
          <div style={{ color: '#555' }}>Years Experience</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#e74c3c' 
          }}>500+</div>
          <div style={{ color: '#555' }}>Happy Clients</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#27ae60' 
          }}>50+</div>
          <div style={{ color: '#555' }}>Countries Served</div>
        </div>
      </div>
    </div>
  );
}

export default About;

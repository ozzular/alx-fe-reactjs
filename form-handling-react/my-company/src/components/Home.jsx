function Home() {
  return (
    <div style={{ 
      padding: '40px 20px', 
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        color: '#2c3e50',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        Welcome to Our Company
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#555',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        We are dedicated to delivering excellence in all our services. 
        With over 30 years of experience, we provide innovative solutions 
        that drive success for our clients worldwide.
      </p>
      <div style={{
        marginTop: '40px',
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          🚀 Innovation
        </div>
        <div style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          ⭐ Excellence
        </div>
        <div style={{
          backgroundColor: '#27ae60',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          🤝 Partnership
        </div>
      </div>
    </div>
  );
}

export default Home;

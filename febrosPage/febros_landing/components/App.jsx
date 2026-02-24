import React from 'react';

const App = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ background: '#ff6f00', color: 'white', padding: '1rem', textAlign: 'center' }}>
        <img 
          src="/Captura de pantalla 2026-02-24 164208.png" 
          alt="Cardozo Digital Studio Logo" 
          style={{ maxWidth: '200px', marginBottom: '1rem' }} 
        />
        <h1>Cardozo Digital Studio</h1>
        <p>Marketing digital que potencia tu negocio</p>
      </header>

      <section style={{ marginTop: '2rem' }}>
        <h2>Estrategias de Marketing Digital</h2>
        <p>Potenciá tu presencia online con estrategias personalizadas que conectan tu marca con tu audiencia. Creamos campañas que generan resultados reales.</p>
        <img src="/assets/punto_de_venta.png" alt="Marketing Digital Cardozo" style={{ width: '100%', maxWidth: '600px' }} />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Gestión de Redes Sociales</h2>
        <p>Automatizá y optimizá la gestión de tus redes sociales con contenido estratégico, visual y 100% adaptado a tu marca.</p>
        <img src="/assets/sistema_gestion.png" alt="Gestión de Redes Cardozo" style={{ width: '100%', maxWidth: '600px' }} />
      </section>

      <footer style={{ marginTop: '4rem', padding: '1rem', background: '#ff6f00', color: 'white', textAlign: 'center' }}>
        <p>¿Querés potenciar tu marca? <a href="https://wa.me/59892331019" style={{ color: 'white', textDecoration: 'underline' }}>Escribinos por WhatsApp</a></p>
        <p>Instagram: <a href="https://www.instagram.com/cardozodigitalstudio" style={{ color: 'white' }}>@cardozodigitalstudio</a></p>
      </footer>
    </div>
  );
};

export default App;

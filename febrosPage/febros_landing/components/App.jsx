import React from 'react';

const App = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ background: '#ff6f00', color: 'white', padding: '1rem' }}>
        <h1>FEBROS</h1>
        <p>Desarrollamos software para potenciar tu negocio</p>
      </header>

      <section style={{ marginTop: '2rem' }}>
        <h2>Punto de Venta Inteligente</h2>
        <p>Gestioná tu tienda, controlá tus ventas y stock en tiempo real con nuestro sistema de punto de venta.</p>
        <img src="/assets/punto_de_venta.png" alt="Punto de Venta FEBROS" style={{ width: '100%', maxWidth: '600px' }} />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Sistema de Gestión</h2>
        <p>Automatizá la gestión de tu negocio con herramientas simples, visuales y 100% adaptables.</p>
        <img src="/assets/sistema_gestion.png" alt="Sistema de Gestión FEBROS" style={{ width: '100%', maxWidth: '600px' }} />
      </section>

      <footer style={{ marginTop: '4rem', padding: '1rem', background: '#ff6f00', color: 'white' }}>
        <p>¿Querés una demo? <a href="https://wa.me/59892331019" style={{ color: 'white', textDecoration: 'underline' }}>Escribinos por WhatsApp</a></p>
        <p>Instagram: <a href="https://www.instagram.com/febros.uy" style={{ color: 'white' }}>@febros.uy</a></p>
      </footer>
    </div>
  );
};

export default App;

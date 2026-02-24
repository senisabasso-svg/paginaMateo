import React, { useState, useEffect, useRef } from 'react';

// Componente para animaciones al hacer scroll
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSplash, setShowSplash] = useState(true);
  const [logoExploded, setLogoExploded] = useState(false);
  const videoRef = useRef(null);

  // Letras del logo para el background
  const logoLetters = ['C', 'A', 'R', 'D', 'O', 'Z', 'O'];
  const studioLetters = ['D', 'I', 'G', 'I', 'T', 'A', 'L', ' ', 'S', 'T', 'U', 'D', 'I', 'O'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Asegurar que el video se reproduzca
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.log('Error al reproducir video:', err);
        });
      }
    };

    // Intentar reproducir inmediatamente y después de que se cargue
    playVideo();
    
    // También intentar después de un pequeño delay
    const videoTimer = setTimeout(playVideo, 100);

    // Explotar logo después de 2 segundos
    const explodeTimer = setTimeout(() => {
      setLogoExploded(true);
    }, 2000);

    // Ocultar splash screen después de 3.5 segundos
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(splashTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      margin: 0,
      padding: 0,
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: -2,
          pointerEvents: 'none',
          backgroundColor: '#000'
        }}
        onCanPlay={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(err => {
              console.log('Error al reproducir video en onCanPlay:', err);
            });
          }
        }}
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(err => {
              console.log('Error al reproducir video en onLoadedData:', err);
            });
          }
        }}
        onError={(e) => {
          console.error('Error cargando video:', e);
        }}
      >
        <source src="https://assets.grok.com/users/caa71fe1-bfc8-4385-86ad-f038d27aaa6d/generated/059aa451-b773-4115-86cb-4236715e88ea/generated_video.mp4?cache=1" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      {/* Splash Screen con Logo Animado */}
      {showSplash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(240, 240, 240, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fadeOut 0.8s ease-out 2.2s forwards',
          pointerEvents: 'none'
        }}>
          <div style={{
            textAlign: 'center',
            animation: 'logoEntrance 1.5s ease-out'
          }}>
            {/* Texto CARDOZO - Grande y Bold con animación de explosión */}
            <div style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              fontWeight: '900',
              color: '#1a1a1a',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.05)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              position: 'relative',
              animation: logoExploded ? 'explodeOut 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'text3D 2s ease-out'
            }}>
              CARDOZO
            </div>
            
            {/* Barra Verde Translúcida con explosión */}
            <div style={{
              width: 'clamp(300px, 60vw, 600px)',
              height: '12px',
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              margin: '1rem auto 1.5rem',
              borderRadius: '6px',
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
              animation: logoExploded ? 'barExplode 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards' : 'barSlide 1s ease-out 0.5s both'
            }} />
            
            {/* Texto DIGITAL STUDIO con explosión */}
            <div style={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: '700',
              color: '#2a2a2a',
              letterSpacing: '0.15em',
              marginTop: '0.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              animation: logoExploded ? 'explodeOut 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards' : 'fadeInUp 1s ease-out 0.8s both'
            }}>
              DIGITAL STUDIO
            </div>
            
            {/* Efecto mágico de explosión */}
            {logoExploded && (
              <>
                {[...Array(30)].map((_, i) => {
                  const angle = (360 / 30) * i;
                  const distance = 200 + Math.random() * 300;
                  const x = Math.cos((angle * Math.PI) / 180) * distance;
                  const y = Math.sin((angle * Math.PI) / 180) * distance;
                  
                  return (
                    <div
                      key={`magic-${i}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: i % 3 === 0 ? 'rgba(99, 102, 241, 0.8)' : i % 3 === 1 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(139, 92, 246, 0.8)',
                        boxShadow: `0 0 15px ${i % 3 === 0 ? 'rgba(99, 102, 241, 1)' : i % 3 === 1 ? 'rgba(34, 197, 94, 1)' : 'rgba(139, 92, 246, 1)'}`,
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        animation: `magicExplode 1.5s ease-out forwards`,
                        opacity: 0
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {/* Letras dispersas del logo como background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Letras de CARDOZO dispersas */}
        {logoLetters.map((letter, index) => {
          const baseAngle = (360 / logoLetters.length) * index;
          const randomOffset = (Math.random() - 0.5) * 60;
          const angle = baseAngle + randomOffset;
          const distance = 250 + Math.random() * 350;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const delay = 2 + index * 0.12;
          const rotation = angle + 180 + (Math.random() - 0.5) * 60;
          
          return (
            <div
              key={`cardozo-${index}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                color: 'rgba(26, 26, 26, 0.18)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transform: logoExploded 
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(0.5)`
                  : 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: logoExploded ? 1 : 0,
                transition: `all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.15)',
                filter: 'blur(1.5px)',
                animation: logoExploded ? `floatLetter 6s ease-in-out infinite ${delay + 1.8}s` : 'none'
              }}
            >
              {letter}
            </div>
          );
        })}
        
        {/* Letras de DIGITAL STUDIO dispersas */}
        {studioLetters.map((letter, index) => {
          if (letter === ' ') return null;
          const baseAngle = (360 / studioLetters.length) * index + 45;
          const randomOffset = (Math.random() - 0.5) * 40;
          const angle = baseAngle + randomOffset;
          const distance = 180 + Math.random() * 280;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const delay = 2.3 + index * 0.1;
          const rotation = angle + (Math.random() - 0.5) * 45;
          
          return (
            <div
              key={`studio-${index}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontWeight: '700',
                color: 'rgba(42, 42, 42, 0.14)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transform: logoExploded 
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(0.4)`
                  : 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: logoExploded ? 1 : 0,
                transition: `all 2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.1)',
                filter: 'blur(1px)',
                animation: logoExploded ? `floatLetterSmall 7s ease-in-out infinite ${delay + 2}s` : 'none'
              }}
            >
              {letter}
            </div>
          );
        })}

        {/* Partículas mágicas */}
        {[...Array(25)].map((_, i) => {
          const angle = (360 / 25) * i;
          const randomOffset = (Math.random() - 0.5) * 30;
          const finalAngle = angle + randomOffset;
          const distance = 150 + Math.random() * 450;
          const x = Math.cos((finalAngle * Math.PI) / 180) * distance;
          const y = Math.sin((finalAngle * Math.PI) / 180) * distance;
          const delay = 2.6 + i * 0.06;
          const colors = ['rgba(99, 102, 241, 0.5)', 'rgba(34, 197, 94, 0.5)', 'rgba(139, 92, 246, 0.5)'];
          const color = colors[i % 3];
          
          return (
            <div
              key={`particle-${i}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: `0 0 15px ${color}`,
                transform: logoExploded 
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  : 'translate(-50%, -50%) scale(0)',
                opacity: logoExploded ? 1 : 0,
                transition: `all 2.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                animation: logoExploded ? `sparkle 4s ease-in-out infinite ${delay + 2.2}s` : 'none'
              }}
            />
          );
        })}

        {/* Barras verdes dispersas */}
        {[...Array(3)].map((_, i) => {
          const angle = 45 + i * 120;
          const distance = 300 + i * 100;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const delay = 2.4 + i * 0.2;
          
          return (
            <div
              key={`bar-${i}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${200 + i * 50}px`,
                height: '6px',
                backgroundColor: 'rgba(34, 197, 94, 0.25)',
                borderRadius: '3px',
                transform: logoExploded 
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle + 45}deg) scale(0.4)`
                  : 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: logoExploded ? 1 : 0,
                transition: `all 2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                filter: 'blur(2px)',
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)'
              }}
            />
          );
        })}
      </div>

      {/* Overlay muy sutil para mejorar legibilidad - el video se ve claramente */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
      {/* Cursor effect background */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        left: mousePosition.x - 250,
        top: mousePosition.y - 250,
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'opacity 0.3s ease',
        opacity: scrolled ? 0.3 : 0.5
      }} />

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem 4rem',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(5px)',
        borderBottom: scrolled ? '1px solid rgba(229, 229, 229, 0.8)' : '1px solid rgba(229, 229, 229, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}>
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['Inicio', 'Quienes Somos', 'Servicios', 'Trabajos', 'Contacto'].map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              style={{ 
                color: '#333', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                position: 'relative',
                transition: 'color 0.3s ease',
                padding: '0.5rem 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
              }}
            >
              {item}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0,
                height: '2px',
                backgroundColor: '#6366f1',
                transition: 'width 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.width = '100%';
              }}
              />
            </a>
          ))}
          <button 
            style={{
                backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(99, 102, 241, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 12px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(99, 102, 241, 0.3)';
            }}
          >
            Agendá una reunión
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" style={{
        padding: '8rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Overlay muy sutil para hero - la imagen se ve claramente */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.4) 100%)',
          zIndex: 1
        }} />
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 2
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: 2
        }} />
        
        <FadeInSection>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '2rem',
            lineHeight: '1.2',
            position: 'relative',
            zIndex: 3
          }}>
            Consigue:{' '}
            <span style={{ 
              color: '#6366f1',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite'
            }}>Más ventas</span>{' '}
            <span style={{ 
              color: '#6366f1',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite 0.3s'
            }}>Más leads</span>{' '}
            <span style={{ 
              color: '#6366f1',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite 0.6s'
            }}>Más tráfico</span>
          </h1>
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <button 
            style={{
                backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '1.2rem 3rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '2rem',
              position: 'relative',
              zIndex: 3,
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.3)';
            }}
          >
            Ver Servicios
          </button>
        </FadeInSection>
      </section>

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" style={{
        padding: '6rem 4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <FadeInSection>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              <span style={{ color: '#6366f1' }}>Quiénes Somos</span>
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p style={{
              fontSize: '1.2rem',
              color: '#555',
              lineHeight: '1.8',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <strong>Cardozo Digital Studio</strong> es una agencia boutique especializada en estrategia y gestión profesional de Instagram. Nuestro enfoque se basa en transformar perfiles digitales en herramientas reales de crecimiento y posicionamiento para negocios.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '2.5rem',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #6366f1',
                paddingBottom: '0.5rem'
              }}>
                2. Objetivo del Servicio
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#555',
                lineHeight: '1.8'
              }}>
                Profesionalizar la presencia digital del negocio, mejorar su imagen de marca y aumentar la captación de clientes a través de una estrategia clara, constante y orientada a resultados.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <p style={{
              fontSize: '1.1rem',
              color: '#555',
              lineHeight: '1.8',
              textAlign: 'center',
              fontStyle: 'italic',
              maxWidth: '800px',
              margin: '2rem auto 0'
            }}>
              En Cardozo Digital Studio trabajamos con un enfoque estratégico, profesional y orientado a resultados reales. Nuestro objetivo es acompañar el crecimiento digital de cada marca con dirección y consistencia.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" style={{
        padding: '6rem 4rem',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.5) 100%)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Servicios <span style={{ color: '#6366f1' }}>Más Solicitados</span>
          </h2>
        </FadeInSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            {
              title: 'Análisis y',
              highlight: 'Diagnóstico',
              subtitle: 'Inicial',
              description: 'Análisis y diagnóstico inicial del perfil para identificar oportunidades de mejora'
            },
            {
              title: 'Estrategia de',
              highlight: 'Contenido',
              subtitle: 'Mensual',
              description: 'Definición de estrategia mensual de contenido optimizada para tu audiencia y objetivos'
            },
            {
              title: 'Optimización de',
              highlight: 'Perfil',
              subtitle: 'y Biografía',
              description: 'Optimización de biografía y estructura del perfil para maximizar conversiones'
            },
            {
              title: '12',
              highlight: 'Publicaciones',
              subtitle: 'Mensuales',
              description: 'Creación de 12 publicaciones mensuales (Reels y Carruseles) con diseño profesional'
            },
            {
              title: 'Copys',
              highlight: 'Profesionales',
              subtitle: 'Orientados a Conversión',
              description: 'Redacción profesional de copys orientados a conversión que conectan con tu audiencia'
            },
            {
              title: 'Calendario',
              highlight: 'Mensual',
              subtitle: 'de Contenido',
              description: 'Calendario mensual de contenido estratégico para mantener consistencia'
            },
            {
              title: 'Historias',
              highlight: 'Estratégicas',
              subtitle: 'Semanales',
              description: 'Historias estratégicas semanales para mantener engagement constante'
            },
            {
              title: 'Asesoramiento',
              highlight: 'Continuo',
              subtitle: 'en Marketing Digital',
              description: 'Asesoramiento continuo en marketing digital para optimizar resultados'
            }
          ].map((service, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '3rem',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scaleX(1)';
                }}
                />
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {service.title} <span style={{ color: '#4a7c2a' }}>{service.highlight}</span> {service.subtitle}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  {service.description}
                </p>
                <a 
                  href="#contacto" 
                  style={{
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'gap 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.gap = '0.8rem';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.gap = '0.5rem';
                  }}
                >
                  Ver Propuesta <span style={{ fontSize: '1.2rem' }}>→</span>
                </a>
              </div>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection delay={0.4}>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a 
              href="#servicios" 
              style={{
                color: '#6366f1',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'gap 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.gap = '0.8rem';
              }}
              onMouseLeave={(e) => {
                e.target.style.gap = '0.5rem';
              }}
            >
              Ver todos los <strong>servicios</strong> <span style={{ fontSize: '1.2rem' }}>→</span>
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* Clients Section */}
      <section id="trabajos" style={{
        padding: '6rem 4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '4rem'
          }}>
            Algunas empresas <span style={{ color: '#6366f1' }}>en las que trabajamos</span>
          </h2>
        </FadeInSection>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          marginTop: '2rem'
        }}>
          {[1, 2, 3, 4].map((item, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div 
                style={{
                  width: '180px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #f0f0f0 0%, #e5e5e5 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Cliente {item}
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section style={{
        padding: '6rem 4rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.5) 100%)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '4rem'
          }}>
            <span style={{ color: '#6366f1' }}>Nos encanta</span> recibir Feedback de nuestros clientes!
          </h2>
        </FadeInSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            "Excelente trabajo y profesionalismo. Los resultados superaron nuestras expectativas.",
            "Muy contentos con el servicio. Recomendamos totalmente a Cardozo Digital Studio."
          ].map((testimonial, index) => (
            <FadeInSection key={index} delay={index * 0.15}>
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
              >
                <p style={{
                  fontSize: '1.1rem',
                  color: '#555',
                  lineHeight: '1.8',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{testimonial}"
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#6366f1',
                  fontWeight: '600'
                }}>
                  - Cliente Satisfecho
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" style={{
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        color: '#ffffff',
        padding: '5rem 4rem 2rem',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <FadeInSection>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#ffffff'
              }}>
                Cardozo Digital Studio
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#ccc',
                lineHeight: '1.7'
              }}>
                Agencia boutique especializada en estrategia de Instagram y gestión profesional.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#ffffff'
              }}>
                CONTACTO
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#ccc',
                marginBottom: '1rem',
                lineHeight: '1.7',
                transition: 'color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = '#6366f1'}
              onMouseLeave={(e) => e.target.style.color = '#ccc'}
              >
                cardozodigitalstudio@gmail.com
              </p>
              <p style={{
                fontSize: '0.95rem',
                color: '#ccc',
                marginBottom: '1rem',
                lineHeight: '1.7'
              }}>
                +598 92 306 192
              </p>
              <p style={{
                fontSize: '0.95rem',
                color: '#ccc',
                lineHeight: '1.7'
              }}>
                Montevideo, Uruguay
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#ffffff'
              }}>
                Redes sociales
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {['Instagram', 'Linkedin', 'Facebook'].map((social, index) => (
                  <a 
                    key={index}
                    href={social === 'Instagram' ? 'https://www.instagram.com/cardozodigitalstudio' : '#'}
                    style={{
                      color: '#ccc',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      width: 'fit-content'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#6366f1';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#ccc';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {social} →
                  </a>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
        <FadeInSection delay={0.3}>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: '#999'
            }}>
              © 2024 Cardozo Digital Studio. Todos los derechos reservados.
            </p>
          </div>
        </FadeInSection>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/59892306192"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '64px',
          height: '64px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          animation: 'pulse 2s ease-in-out infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 30px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes text3D {
          0% {
            opacity: 0;
            transform: perspective(1000px) rotateX(90deg) scale(0.5);
            filter: blur(10px);
          }
          60% {
            transform: perspective(1000px) rotateX(0deg) scale(1.05);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes barSlide {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: clamp(300px, 60vw, 600px);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        
        @keyframes explodeOut {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2) rotate(180deg);
            filter: blur(5px);
          }
          100% {
            opacity: 0;
            transform: scale(0.3) rotate(360deg);
            filter: blur(10px);
          }
        }
        
        @keyframes barExplode {
          0% {
            opacity: 1;
            transform: scaleX(1) scaleY(1);
          }
          50% {
            opacity: 0.6;
            transform: scaleX(1.5) scaleY(0.3) rotate(45deg);
          }
          100% {
            opacity: 0;
            transform: scaleX(0.2) scaleY(0.1) rotate(90deg);
          }
        }
        
        @keyframes floatLetter {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-20px) rotate(5deg) scale(1.1);
          }
        }
        
        @keyframes floatLetterSmall {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-15px) rotate(3deg) scale(1.05);
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.8);
          }
        }
        
        @keyframes magicExplode {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default App;

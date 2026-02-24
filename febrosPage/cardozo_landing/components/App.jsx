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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
      {/* Cursor effect background */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        left: mousePosition.x - 250,
        top: mousePosition.y - 250,
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'opacity 0.3s ease',
        opacity: scrolled ? 0.3 : 0.5
      }} />

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 4rem',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(229, 229, 229, 0.8)' : '1px solid #e5e5e5',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
          src="/image.jpg" 
          alt="Cardozo Digital Studio Logo" 
            style={{ 
              maxHeight: '60px',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
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
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        
        <FadeInSection>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '2rem',
            lineHeight: '1.2',
            position: 'relative',
            zIndex: 2
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
              zIndex: 2,
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
        backgroundColor: '#ffffff',
        position: 'relative'
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
              <span style={{ color: '#4a7c2a' }}>Quiénes Somos</span>
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
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Servicios <span style={{ color: '#4a7c2a' }}>Más Solicitados</span>
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
                  backgroundColor: '#ffffff',
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
        backgroundColor: '#ffffff',
        textAlign: 'center',
        position: 'relative'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '4rem'
          }}>
            Algunas empresas <span style={{ color: '#4a7c2a' }}>en las que trabajamos</span>
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
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '4rem'
          }}>
            <span style={{ color: '#4a7c2a' }}>Nos encanta</span> recibir Feedback de nuestros clientes!
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
                  backgroundColor: '#ffffff',
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
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '5rem 4rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <FadeInSection>
            <div>
              <img 
                src="/image.jpg" 
                alt="Cardozo Digital Studio Logo" 
                style={{ 
                  maxHeight: '60px',
                  objectFit: 'contain',
                  marginBottom: '1.5rem'
                }} 
              />
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
              onMouseEnter={(e) => e.target.style.color = '#4a7c2a'}
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
                      e.target.style.color = '#4a7c2a';
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
      `}</style>
    </div>
  );
};

export default App;

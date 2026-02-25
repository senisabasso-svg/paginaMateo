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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSplash, setShowSplash] = useState(true);
  const [logoExploded, setLogoExploded] = useState(false);
  const videoRef = useRef(null);

  // Letras del logo para el background
  const logoLetters = ['C', 'A', 'R', 'D', 'O', 'Z', 'O'];
  const studioLetters = ['D', 'I', 'G', 'I', 'T', 'A', 'L', ' ', 'S', 'T', 'U', 'D', 'I', 'O'];

  // Calcular color del background según el scroll
  const getBackgroundColor = () => {
    // Azul oscuro inicial: rgb(13, 36, 63) o #0D243F
    // Azul medio: rgb(59, 130, 246) o #3B82F6
    // Morado: rgb(138, 43, 226) o #8A2BE2
    
    if (scrollProgress < 0.5) {
      // Azul oscuro -> Azul (0% a 50%)
      const progress = scrollProgress * 2; // 0 a 1
      const r = Math.round(13 + (59 - 13) * progress);
      const g = Math.round(36 + (130 - 36) * progress);
      const b = Math.round(63 + (246 - 63) * progress);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Azul -> Morado (50% a 100%)
      const progress = (scrollProgress - 0.5) * 2; // 0 a 1
      const r = Math.round(59 + (138 - 59) * progress);
      const g = Math.round(130 + (43 - 130) * progress);
      const b = Math.round(246 + (226 - 246) * progress);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Calcular opacidad de los logos según el scroll
  const getFacebookOpacity = () => {
    if (scrollProgress < 0.3) return 0;
    if (scrollProgress > 0.7) return 0;
    if (scrollProgress >= 0.3 && scrollProgress <= 0.5) {
      return (scrollProgress - 0.3) / 0.2; // Fade in
    }
    return 1 - (scrollProgress - 0.5) / 0.2; // Fade out
  };

  const getInstagramOpacity = () => {
    if (scrollProgress < 0.7) return 0;
    return Math.min((scrollProgress - 0.7) / 0.3, 1); // Fade in desde 70%
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calcular progreso del scroll (0 a 1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Calcular scroll inicial
    handleScroll();

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

  const bgColor = getBackgroundColor();

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      minHeight: '100vh',
      backgroundColor: bgColor,
      margin: 0,
      padding: 0,
      position: 'relative',
      overflowX: 'hidden',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Efectos de fondo dinámicos que cambian con el scroll */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor} 100%)`,
        overflow: 'hidden',
        transition: 'background 0.3s ease'
      }}>
        {/* Círculos decorativos que cambian de color según scroll - capa 1 */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: scrollProgress < 0.5 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(138, 43, 226, 0.18) 0%, rgba(138, 43, 226, 0.08) 40%, transparent 70%)',
          animation: 'floatLarge 12s ease-in-out infinite',
          filter: 'blur(40px)',
          transition: 'background 0.3s ease'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: scrollProgress < 0.5
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, rgba(138, 43, 226, 0.06) 40%, transparent 70%)',
          animation: 'floatLarge 14s ease-in-out infinite reverse',
          filter: 'blur(50px)',
          transition: 'background 0.3s ease'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: scrollProgress < 0.5
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(138, 43, 226, 0.12) 0%, rgba(138, 43, 226, 0.04) 40%, transparent 70%)',
          animation: 'floatLarge 16s ease-in-out infinite',
          filter: 'blur(60px)',
          transition: 'background 0.3s ease'
        }} />

        {/* Partículas flotantes pequeñas - capa 2 */}
        {[...Array(40)].map((_, i) => {
          const size = 3 + Math.random() * 5;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const duration = 8 + Math.random() * 12;
          const delay = Math.random() * 5;
          
          return (
            <div
              key={`particle-bg-${i}`}
              style={{
                position: 'absolute',
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: scrollProgress < 0.5
                  ? `rgba(59, 130, 246, ${0.3 + Math.random() * 0.4})`
                  : `rgba(138, 43, 226, ${0.3 + Math.random() * 0.4})`,
                boxShadow: scrollProgress < 0.5
                  ? `0 0 ${size * 2}px rgba(59, 130, 246, 0.6)`
                  : `0 0 ${size * 2}px rgba(138, 43, 226, 0.6)`,
                animation: `particleFloat ${duration}s ease-in-out infinite ${delay}s`,
                filter: 'blur(1px)'
              }}
            />
          );
        })}

        {/* Formas geométricas flotantes - capa 3 */}
        {[...Array(12)].map((_, i) => {
          const size = 20 + Math.random() * 40;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const duration = 10 + Math.random() * 15;
          const delay = Math.random() * 8;
          const rotation = Math.random() * 360;
          const isCircle = Math.random() > 0.5;
          
          return (
            <div
              key={`shape-${i}`}
              style={{
                position: 'absolute',
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: isCircle ? '50%' : '8px',
                background: scrollProgress < 0.5
                  ? `rgba(59, 130, 246, ${0.05 + Math.random() * 0.1})`
                  : `rgba(138, 43, 226, ${0.05 + Math.random() * 0.1})`,
                border: scrollProgress < 0.5
                  ? `1px solid rgba(59, 130, 246, ${0.2 + Math.random() * 0.3})`
                  : `1px solid rgba(138, 43, 226, ${0.2 + Math.random() * 0.3})`,
                animation: `shapeFloat ${duration}s ease-in-out infinite ${delay}s`,
                transform: `rotate(${rotation}deg)`,
                filter: 'blur(2px)'
              }}
            />
          );
        })}

        {/* Ondas de gradiente animadas - capa 4 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '0%',
          width: '100%',
          height: '200px',
          background: scrollProgress < 0.5
            ? 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(138, 43, 226, 0.1) 50%, transparent 100%)',
          animation: 'waveMove 20s linear infinite',
          filter: 'blur(30px)',
          transform: 'rotate(-5deg)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '0%',
          width: '100%',
          height: '150px',
          background: scrollProgress < 0.5
            ? 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(138, 43, 226, 0.08) 50%, transparent 100%)',
          animation: 'waveMove 25s linear infinite reverse',
          filter: 'blur(25px)',
          transform: 'rotate(5deg)'
        }} />

        {/* Efectos de profundidad con múltiples capas */}
        <div style={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          background: scrollProgress < 0.5
            ? 'radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 30% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
          animation: 'depthPulse 18s ease-in-out infinite',
          filter: 'blur(80px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0%',
          right: '0%',
          width: '100%',
          height: '100%',
          background: scrollProgress < 0.5
            ? 'radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 70% 80%, rgba(138, 43, 226, 0.08) 0%, transparent 50%)',
          animation: 'depthPulse 22s ease-in-out infinite reverse',
          filter: 'blur(90px)'
        }} />
      </div>
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
              color: '#ffffff',
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
                        backgroundColor: i % 3 === 0 ? 'rgba(255, 152, 0, 0.8)' : i % 3 === 1 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(255, 152, 0, 0.8)',
                        boxShadow: `0 0 15px ${i % 3 === 0 ? 'rgba(255, 152, 0, 1)' : i % 3 === 1 ? 'rgba(34, 197, 94, 1)' : 'rgba(255, 152, 0, 1)'}`,
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
          const colors = ['rgba(255, 152, 0, 0.5)', 'rgba(34, 197, 94, 0.5)', 'rgba(255, 152, 0, 0.5)'];
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

      {/* Cursor effect background que cambia según scroll */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: scrollProgress < 0.5
          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
        left: mousePosition.x - 250,
        top: mousePosition.y - 250,
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'opacity 0.3s ease, background 0.3s ease',
        opacity: scrolled ? 0.2 : 0.4
      }} />

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem 4rem',
        backgroundColor: scrolled ? `rgba(255, 255, 255, 0.9)` : `rgba(255, 255, 255, 0.8)`,
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(8px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}>
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['Inicio', 'Quienes Somos', 'Servicios', 'Trabajos', 'Contacto'].map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              style={{ 
                color: '#ffffff', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                position: 'relative',
                transition: 'color 0.3s ease',
                padding: '0.5rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffd700';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#ffffff';
              }}
            >
              {item}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0,
                height: '2px',
                backgroundColor: scrollProgress < 0.5 ? '#3B82F6' : '#8A2BE2',
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
                backgroundColor: scrollProgress < 0.5 ? '#3B82F6' : '#8A2BE2',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(255, 152, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 12px rgba(255, 152, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(255, 152, 0, 0.3)';
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
        {/* Overlay sutil para hero */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)',
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
          background: 'radial-gradient(circle, rgba(255, 152, 0, 0.15) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(255, 152, 0, 0.12) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: 2
        }} />
        
        <FadeInSection>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '2rem',
            lineHeight: '1.2',
            position: 'relative',
            zIndex: 3
          }}>
            Consigue:{' '}
            <span style={{ 
              color: scrollProgress < 0.5 ? '#60A5FA' : '#A78BFA',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite'
            }}>Más ventas</span>{' '}
            <span style={{ 
              color: scrollProgress < 0.5 ? '#60A5FA' : '#A78BFA',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite 0.3s'
            }}>Más leads</span>{' '}
            <span style={{ 
              color: scrollProgress < 0.5 ? '#60A5FA' : '#A78BFA',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite 0.6s'
            }}>Más tráfico</span>
          </h1>
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <button 
            style={{
                backgroundColor: scrollProgress < 0.5 ? '#3B82F6' : '#8A2BE2',
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
              boxShadow: '0 8px 20px rgba(255, 152, 0, 0.3)',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 12px 30px rgba(255, 152, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 20px rgba(255, 152, 0, 0.3)';
            }}
          >
            Ver Servicios
          </button>
        </FadeInSection>
      </section>

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" style={{
        padding: '6rem 4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <FadeInSection>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              <span style={{ color: '#ff9800' }}>Quiénes Somos</span>
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p style={{
              fontSize: '1.2rem',
              color: '#e0e0e0',
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
                color: '#ffffff',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #ff9800',
                paddingBottom: '0.5rem'
              }}>
                2. Objetivo del Servicio
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#e0e0e0',
                lineHeight: '1.8'
              }}>
                Profesionalizar la presencia digital del negocio, mejorar su imagen de marca y aumentar la captación de clientes a través de una estrategia clara, constante y orientada a resultados.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <p style={{
              fontSize: '1.1rem',
              color: '#e0e0e0',
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
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.15) 100%)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Servicios <span style={{ color: '#ff9800' }}>Más Solicitados</span>
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
                  border: '1px solid rgba(255, 152, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(255, 152, 0, 0.2)';
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
                  background: 'linear-gradient(90deg, #ff9800, #ff6f00)',
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
                  color: '#ffffff',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {service.title} <span style={{ color: '#4a7c2a' }}>{service.highlight}</span> {service.subtitle}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#d0d0d0',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  {service.description}
                </p>
                <a 
                  href="#contacto" 
                  style={{
                    color: scrollProgress < 0.5 ? '#60A5FA' : '#A78BFA',
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
                color: scrollProgress < 0.5 ? '#60A5FA' : '#A78BFA',
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '4rem'
          }}>
            Algunas empresas <span style={{ color: '#ff9800' }}>en las que trabajamos</span>
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
                  color: '#b0b0b0',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.borderColor = '#ff9800';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 152, 0, 0.2)';
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
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(2px)'
      }}>
        <FadeInSection>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '4rem'
          }}>
            <span style={{ color: '#ff9800' }}>Nos encanta</span> recibir Feedback de nuestros clientes!
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
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 152, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
              >
                <p style={{
                  fontSize: '1.1rem',
                  color: '#e0e0e0',
                  lineHeight: '1.8',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{testimonial}"
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  color: scrollProgress < 0.5 ? '#60A5FA' : '#A78BFA',
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
              onMouseEnter={(e) => e.target.style.color = '#ff9800'}
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

      {/* Video Floating Button - Donación febros.uy */}
      <a
        href="https://www.instagram.com/febros.uy/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1000,
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '4px',
            animation: 'pulse 2s ease-in-out infinite',
            overflow: 'hidden'
          }}
        >
          <img
            src="/febros-logo.png"
            alt="Febros Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none'
            }}
          />
        </div>
        <span
          style={{
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#ffffff',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          Donacion de febros.uy
        </span>
      </a>

      {/* Logo de Facebook en lateral izquierdo - aparece en mitad de página */}
      <div
        style={{
          position: 'fixed',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          opacity: getFacebookOpacity(),
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents: getFacebookOpacity() > 0.5 ? 'auto' : 'none'
        }}
      >
        <a
          href="https://www.facebook.com/cardozodigitalstudio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="#1877F2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>

      {/* Logo de Instagram en lateral derecho - aparece al final */}
      <div
        style={{
          position: 'fixed',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          opacity: getInstagramOpacity(),
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents: getInstagramOpacity() > 0.5 ? 'auto' : 'none'
        }}
      >
        <a
          href="https://www.instagram.com/cardozodigitalstudio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(138, 43, 226, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="url(#instagram-gradient)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#833AB4" />
                <stop offset="50%" stopColor="#FD1D1D" />
                <stop offset="100%" stopColor="#FCB045" />
              </linearGradient>
            </defs>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>

      {/* Lluvia de logos de Facebook - aparece en zona azul (30% a 70% del scroll) */}
      {scrollProgress >= 0.3 && scrollProgress <= 0.7 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 998,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 4;
            const size = 20 + Math.random() * 30;
            
            return (
              <div
                key={`fb-rain-${i}`}
                style={{
                  position: 'absolute',
                  left: `${left}%`,
                  top: '-50px',
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.6 + Math.random() * 0.4,
                  animation: `rainFall ${duration}s linear infinite ${delay}s`,
                  pointerEvents: 'none'
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            );
          })}
        </div>
      )}

      {/* Lluvia de logos de Instagram - aparece en zona morada (70%+ del scroll) */}
      {scrollProgress > 0.7 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 998,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 4;
            const size = 20 + Math.random() * 30;
            
            return (
              <div
                key={`ig-rain-${i}`}
                style={{
                  position: 'absolute',
                  left: `${left}%`,
                  top: '-50px',
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.6 + Math.random() * 0.4,
                  animation: `rainFall ${duration}s linear infinite ${delay}s`,
                  pointerEvents: 'none'
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill={`url(#instagram-gradient-rain-${i})`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`instagram-gradient-rain-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#833AB4" />
                      <stop offset="50%" stopColor="#FD1D1D" />
                      <stop offset="100%" stopColor="#FCB045" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floatLarge {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-20px, -60px) scale(0.9);
            opacity: 0.7;
          }
          75% {
            transform: translate(40px, -30px) scale(1.05);
            opacity: 0.75;
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.7;
          }
          50% {
            transform: translate(-15px, -50px) scale(0.8);
            opacity: 0.5;
          }
          75% {
            transform: translate(25px, -20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes shapeFloat {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(40px, -50px) rotate(120deg) scale(1.2);
            opacity: 0.5;
          }
          66% {
            transform: translate(-30px, -70px) rotate(240deg) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes waveMove {
          0% {
            transform: translateX(-100%) rotate(-5deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) rotate(-5deg);
            opacity: 0;
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes depthPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.8;
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

        @keyframes rainFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default App;

'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Параллакс-эффект для элементов
  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
  };

  const floatStyle = {
    animation: 'float 6s ease-in-out infinite',
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{
        background: 'linear-gradient(135deg, #0f045c 0%, #423e8e 50%, #0f045c 100%)',
      }}
    >
      {/* Анимированные элементы фона */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-[25%] left-[25%] w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          style={floatStyle}
        ></div>
        <div 
          className="absolute top-[33%] right-[25%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          style={{ ...floatStyle, animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-[25%] left-[50%] w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
          style={{ ...floatStyle, animationDelay: '4s' }}
        ></div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div 
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={parallaxStyle}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Сергей Канчер
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Медиа-профессионал с 15+ летним опытом • Создатель интерактивного портфолио Kancher.Tv
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn text-lg px-8 py-4 text-gradient border-2 border-transparent bg-clip-border bg-gradient-to-r from-cyan-400 to-blue-500">
              Исследовать портфолио
            </button>
            <button className="btn text-lg px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors">
              Связаться со мной
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [expandedPhilosophy, setExpandedPhilosophy] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  const philosophyPoints = [
    {
      title: "Интерактивность",
      description: "Верю, что медиа должно быть не просто воспринимаемым, но и взаимодействующим с аудиторией",
      icon: "🔄"
    },
    {
      title: "Инновации",
      description: "Постоянное изучение новых технологий и форматов для создания уникального опыта",
      icon: "💡"
    },
    {
      title: "Человечность",
      description: "Технологии должны служить людям, а не наоборот",
      icon: "👤"
    },
    {
      title: "Профессионализм",
      description: "Качество и внимание к деталям в каждой работе",
      icon: "✅"
    }
  ];

  useEffect(() => {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.about-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Обо Мне</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div 
            className={`about-section transform transition-all duration-700 ${
              isVisible.aboutText ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-50px]'
            }`}
            data-section="aboutText"
          >
            <h3 className="text-3xl font-bold mb-6 text-gradient">Моя История</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Привет! Меня зовут Сергей Канчер, и я - медиа-профессионал с более чем 15-летним опытом работы в телевидении, 
              радио и цифровых медиа. Моя карьера началась в региональном телевидении, где я осваивал основы теле- и радиовещания, 
              и постепенно развивалась до участия в крупных федеральных и международных проектах.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              За эти годы я работал с различными форматами - от традиционного телевидения до современных цифровых платформ. 
              Я верю в силу интерактивного медиа и в то, как технологии могут улучшить взаимодействие между создателями 
              контента и аудиторией. Это убеждение стало основой для создания Kancher.Tv - интерактивного портфолио, 
              которое вы сейчас видите.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Я постоянно изучаю новые технологии и форматы, чтобы оставаться на переднем крае индустрии. 
              В свободное время я увлекаюсь изучением искусственного интеллекта и его применения в медиапроизводстве.
            </p>
          </div>
          
          <div 
            className={`about-section transform transition-all duration-700 ${
              isVisible.aboutImage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50px]'
            }`}
            data-section="aboutImage"
          >
            <div className="card p-0 overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 h-96 w-full rounded-xl flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="text-6xl mb-4">👤</div>
                    <h3 className="text-2xl font-bold">Сергей Канчер</h3>
                    <p className="text-cyan-200 mt-2">Медиа-профессионал • Инноватор • Творец</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Философия */}
        <div 
          className={`about-section card transform transition-all duration-700 ${
            isVisible.philosophy ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          data-section="philosophy"
        >
          <h3 className="text-3xl font-bold mb-8 text-gradient text-center">Моя Философия</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="text-3xl">{point.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gradient">{point.title}</h4>
                  <p className="text-gray-300">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <button 
              onClick={() => setExpandedPhilosophy(!expandedPhilosophy)}
              className="btn text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors mx-auto"
            >
              {expandedPhilosophy ? 'Свернуть' : 'Подробнее о философии'}
            </button>
            
            {expandedPhilosophy && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-300 leading-relaxed">
                  Моя работа основана на принципах интерактивности, инноваций и человечности. 
                  Я убежден, что медиаформаты должны эволюционировать, чтобы соответствовать 
                  меняющимся ожиданиям аудитории. В эпоху цифровых технологий и искусственного 
                  интеллекта особенно важно сохранять человеческое измерение в создаваемом контенте.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Kancher.Tv - это не просто портфолио, это пример того, как традиционные 
                  медиаподходы могут быть объединены с современными технологиями для создания 
                  уникального пользовательского опыта. Я стремлюсь к созданию медиапродуктов, 
                  которые не только информируют и развлекают, но и вдохновляют на взаимодействие 
                  и диалог.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
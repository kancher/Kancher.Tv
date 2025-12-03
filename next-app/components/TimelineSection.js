'use client';

import { useState, useEffect } from 'react';

export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const timelineData = [
    {
      year: "2010-2012",
      title: "Начало карьеры",
      description: "Работа в региональном телевидении, освоение основ теле- и радиовещания",
      achievements: ["Первый опыт работы в эфире", "Обучение основам монтажа", "Работа с различными форматами контента"]
    },
    {
      year: "2012-2015",
      title: "Развитие навыков",
      description: "Переход на федеральные каналы, участие в крупных проектах",
      achievements: ["Работа над музыкальными проектами", "Участие в телешоу", "Развитие навыков ведущего"]
    },
    {
      year: "2015-2018",
      title: "Профессиональный рост",
      description: "Лидирующие позиции в медиа-индустрии, создание собственных программ",
      achievements: ["Создание авторской программы", "Работа с известными гостями", "Участие в международных проектах"]
    },
    {
      year: "2018-2021",
      title: "Цифровая трансформация",
      description: "Адаптация к новым медиаформатам, развитие онлайн-контента",
      achievements: ["Запуск YouTube-канала", "Создание подкастов", "Работа с социальными сетями"]
    },
    {
      year: "2021-2025",
      title: "Интерактивное будущее",
      description: "Создание инновационного интерактивного портфолио, интеграция ИИ",
      achievements: ["Разработка Kancher.Tv", "Интеграция ИИ-ассистента", "Создание уникального пользовательского опыта"]
    }
  ];

  useEffect(() => {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.timeline-item').forEach((el, index) => {
      observer.observe(el);
      el.setAttribute('data-index', index);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="section relative py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Таймлайн Карьеры</h2>
        
        <div className="relative">
          {/* Линия таймлайна */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500"></div>
          
          {/* Элементы таймлайна */}
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className={`timeline-item mb-10 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              style={{ minHeight: '200px' }}
            >
              <div className="md:w-1/2 mb-4 md:mb-0 md:px-8">
                <div 
                  className={`card transform transition-all duration-700 ${
                    isVisible[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-50px]'
                  } ${index % 2 === 0 ? 'md:translate-x-0' : 'md:translate-x-0'}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  <div className="year-tag bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full inline-block mb-3">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gradient">{item.title}</h3>
                  <p className="mb-4 text-gray-300">{item.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-300">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Точка на таймлайне */}
              <div className="md:w-1/2 flex justify-center md:justify-start md:order-1">
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-4 border-white shadow-lg">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
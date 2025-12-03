'use client';

import { useState, useEffect } from 'react';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [isVisible, setIsVisible] = useState({});

  const skills = {
    technical: [
      { name: 'HTML5/CSS3', level: 95, description: 'Семантическая верстка, адаптивный дизайн, анимации' },
      { name: 'JavaScript/TypeScript', level: 90, description: 'ES6+, асинхронное программирование, фреймворки' },
      { name: 'React/Next.js', level: 85, description: 'Создание интерактивных пользовательских интерфейсов' },
      { name: 'UI/UX Design', level: 80, description: 'Проектирование пользовательских интерфейсов' },
      { name: 'Video Production', level: 95, description: 'Производство и пост-продакшн видео-контента' },
      { name: 'Broadcasting', level: 90, description: 'Работа с телевизионным оборудованием и форматами' }
    ],
    creative: [
      { name: 'Content Creation', level: 95, description: 'Создание уникального и привлекательного контента' },
      { name: 'Storytelling', level: 90, description: 'Искусство рассказа и построения нарратива' },
      { name: 'Media Planning', level: 85, description: 'Планирование и организация медиапроектов' },
      { name: 'Brand Development', level: 80, description: 'Разработка и продвижение брендов' },
      { name: 'Creative Direction', level: 88, description: 'Креативное руководство проектами' },
      { name: 'Visual Design', level: 82, description: 'Визуальное оформление и брендинг' }
    ],
    personal: [
      { name: 'Leadership', level: 90, description: 'Руководство командами и проектами' },
      { name: 'Communication', level: 95, description: 'Эффективная коммуникация с разными аудиториями' },
      { name: 'Problem Solving', level: 88, description: 'Анализ и решение сложных задач' },
      { name: 'Adaptability', level: 92, description: 'Быстрая адаптация к новым условиям и технологиям' },
      { name: 'Project Management', level: 85, description: 'Управление проектами и ресурсами' },
      { name: 'Innovation', level: 90, description: 'Поиск и внедрение инновационных решений' }
    ]
  };

  const categories = [
    { id: 'technical', name: 'Технические', icon: '💻' },
    { id: 'creative', name: 'Креативные', icon: '🎨' },
    { id: 'personal', name: 'Личные', icon: '👥' }
  ];

  useEffect(() => {
    // Анимация прогресс-баров при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-category');
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.skills-category').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Навыки и Компетенции</h2>
        
        {/* Кнопки категорий */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Навыки текущей категории */}
        <div className="skills-category" data-category={activeCategory}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skills[activeCategory].map((skill, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gradient">{skill.name}</h3>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible[activeCategory] ? `${skill.level}%` : '0%' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
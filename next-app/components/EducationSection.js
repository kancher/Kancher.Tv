'use client';

import { useState, useEffect } from 'react';

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState('education');
  const [isVisible, setIsVisible] = useState({});

  const educationData = [
    {
      id: 1,
      institution: "Московский государственный университет",
      degree: "Магистр медиакоммуникаций",
      period: "2008-2010",
      description: "Специализация в области телевизионного производства и медиапланирования",
      achievements: ["Выпускная работа по интерактивному телевидению", "Участие в международных медиа-форумах"]
    },
    {
      id: 2,
      institution: "Высшая школа телевидения",
      degree: "Курсы повышения квалификации",
      period: "2011-2012",
      description: "Практические навыки ведения телепрограмм и работы в эфире",
      achievements: ["Лучший выпускник курса", "Практика на федеральных каналах"]
    },
    {
      id: 3,
      institution: "Coursera / EDX",
      degree: "Специализации в области цифровых технологий",
      period: "2015-2020",
      description: "Онлайн-курсы по современным медиа-технологиям и интерактивным форматам",
      achievements: ["Сертификаты по UX/UI дизайну", "Обучение работе с ИИ-инструментами"]
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Сертификат по цифровому производству",
      issuer: "Adobe Certified Expert",
      date: "2019",
      description: "Сертификация по профессиональным инструментам видеопроизводства"
    },
    {
      id: 2,
      title: "Интерактивные медиаформаты",
      issuer: "Google Digital Academy",
      date: "2021",
      description: "Обучение современным подходам к созданию интерактивного контента"
    },
    {
      id: 3,
      title: "ИИ в медиаиндустрии",
      issuer: "MIT Professional Education",
      date: "2023",
      description: "Применение искусственного интеллекта в медиапроизводстве"
    }
  ];

  useEffect(() => {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.edu-card').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Образование и Сертификации</h2>
        
        {/* Табы для переключения между образованием и сертификатами */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('education')}
            >
              Образование
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('certifications')}
            >
              Сертификации
            </button>
          </div>
        </div>
        
        {/* Контент вкладок */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab === 'education' 
            ? educationData.map((edu) => (
                <div
                  key={edu.id}
                  data-id={edu.id}
                  className={`edu-card card transform transition-all duration-700 ${
                    isVisible[edu.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="year-tag bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full inline-block mb-3">
                    {edu.period}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gradient">{edu.institution}</h3>
                  <h4 className="text-lg font-semibold mb-2 text-cyan-400">{edu.degree}</h4>
                  <p className="text-gray-300 mb-4">{edu.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-300 text-sm">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))
            : certifications.map((cert) => (
                <div
                  key={cert.id}
                  data-id={cert.id}
                  className={`edu-card card transform transition-all duration-700 ${
                    isVisible[cert.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="year-tag bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full inline-block mb-3">
                    {cert.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gradient">{cert.title}</h3>
                  <h4 className="text-lg font-semibold mb-2 text-cyan-400">{cert.issuer}</h4>
                  <p className="text-gray-300 mb-4">{cert.description}</p>
                  <button className="btn text-sm text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors">
                    Просмотреть сертификат
                  </button>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
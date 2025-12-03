'use client';

import { useState, useEffect } from 'react';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  const projects = [
    {
      id: 1,
      title: "Kancher.Tv",
      category: "interactive",
      description: "Интерактивное портфолио с ИИ-ассистентом и уникальным пользовательским опытом",
      image: "/placeholder-project.jpg",
      link: "#",
      year: "2024",
      technologies: ["Next.js", "AI", "CSS3", "JavaScript"]
    },
    {
      id: 2,
      title: "Музыкальный проект",
      category: "media",
      description: "Телевизионная программа о современной музыке и артистах",
      image: "/placeholder-project.jpg",
      link: "#",
      year: "2019",
      technologies: ["TV Production", "Video Editing", "Broadcasting"]
    },
    {
      id: 3,
      title: "Подкаст-платформа",
      category: "digital",
      description: "Онлайн-платформа для создания и распространения подкастов",
      image: "/placeholder-project.jpg",
      link: "#",
      year: "2021",
      technologies: ["React", "Node.js", "Audio Processing"]
    },
    {
      id: 4,
      title: "Образовательный контент",
      category: "education",
      description: "Серия обучающих видеоуроков по медиапроизводству",
      image: "/placeholder-project.jpg",
      link: "#",
      year: "2020",
      technologies: ["Video Production", "Curriculum Design", "E-learning"]
    },
    {
      id: 5,
      title: "Интерактивная телепрограмма",
      category: "media",
      description: "ТВ-шоу с элементами интерактивности и прямого эфира",
      image: "/placeholder-project.jpg",
      link: "#",
      year: "2017",
      technologies: ["Broadcasting", "Live Production", "Audience Interaction"]
    },
    {
      id: 6,
      title: "AR-опыт для зрителей",
      category: "interactive",
      description: "Дополненная реальность для телевизионных проектов",
      image: "/placeholder-project.jpg",
      link: "#",
      year: "2022",
      technologies: ["AR", "WebGL", "JavaScript", "3D Graphics"]
    }
  ];

  const categories = [
    { id: 'all', name: 'Все проекты' },
    { id: 'interactive', name: 'Интерактивные' },
    { id: 'media', name: 'Медиа' },
    { id: 'digital', name: 'Цифровые' },
    { id: 'education', name: 'Образовательные' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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

    document.querySelectorAll('.project-card').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Ключевые Проекты</h2>
        
        {/* Фильтры категорий */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-id={project.id}
              className={`project-card card transform transition-all duration-700 ${
                isVisible[project.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {project.year}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-gradient">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-700 text-cyan-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <a 
                href={project.link} 
                className="inline-block btn text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors"
              >
                Подробнее
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
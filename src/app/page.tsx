'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    // Здесь будет код из оригинального script.js
    // Инициализация AI-ассистента
    const initAIAssistant = () => {
      // Заглушка для AI-ассистента
      console.log('AI-ассистент инициализирован');
    };

    // Инициализация анимаций при скролле
    const initScrollAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    };

    // Инициализация параллакс-эффектов
    const initParallax = () => {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach((element: any) => {
          const speed = parseFloat(element.dataset.speed || '0.5');
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    };

    // Инициализация навигации
    const initNavigation = () => {
      const navLinks = document.querySelectorAll('nav a');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId || '');
          
          if (targetSection) {
            window.scrollTo({
              top: targetSection.getBoundingClientRect().top + window.pageYOffset - 80,
              behavior: 'smooth'
            });
          }
        });
      });
    };

    // Вызов всех инициализаций
    initAIAssistant();
    initScrollAnimations();
    initParallax();
    initNavigation();

    // Дополнительные функции из оригинального скрипта
    const updateProgressBar = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = (scrollTop / scrollHeight) * 100;
      
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = percent + '%';
      }
    };

    window.addEventListener('scroll', updateProgressBar);
  }, []);

  return (
    <div className="portfolio">
      {/* Прогресс-бар прокрутки */}
      <div id="progress-container">
        <div id="progress-bar"></div>
      </div>

      {/* Навигация */}
      <nav id="navbar">
        <ul>
          <li><a href="#hero">Главная</a></li>
          <li><a href="#timeline">Карьерный путь</a></li>
          <li><a href="#projects">Проекты</a></li>
          <li><a href="#education">Образование</a></li>
          <li><a href="#skills">Навыки</a></li>
          <li><a href="#about">Обо мне</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
      </nav>

      {/* Секция героя */}
      <section id="hero" className="hero animate-on-scroll">
        <div className="hero-content">
          <h1>СЕРГЕЙ КАНЧЕР</h1>
          <p>Медиа-профессионал с 15-летним опытом</p>
          <div className="hero-subtitle">
            <p>Креативный директор, продюсер, визионер</p>
          </div>
        </div>
        <div className="hero-image parallax" data-speed="0.3">
          <div className="gradient-overlay"></div>
        </div>
      </section>

      {/* Секция таймлайна */}
      <section id="timeline" className="timeline-section">
        <div className="container">
          <h2 className="section-title">Карьерный путь</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <h3>Начало карьеры</h3>
                <p>Работа в региональном телевидении</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2013</div>
              <div className="timeline-content">
                <h3>Переезд в Москву</h3>
                <p>Работа в федеральных медиахолдингах</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2016</div>
              <div className="timeline-content">
                <h3>Основание продакшн-студии</h3>
                <p>Kancher Production</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Цифровая трансформация</h3>
                <p>Развитие онлайн-форматов</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>Новое видение</h3>
                <p>AI-ассистенты в медиа</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция проектов */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Ключевые проекты</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image"></div>
              <div className="project-info">
                <h3>Телепередача "Город"</h3>
                <p>Региональное телевидение, 2010-2013</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image"></div>
              <div className="project-info">
                <h3>Новостной проект "Экспресс"</h3>
                <p>Федеральное вещание, 2013-2016</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image"></div>
              <div className="project-info">
                <h3>Продакшн-студия Kancher</h3>
                <p>Полный цикл производства, 2016-наст.вр.</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image"></div>
              <div className="project-info">
                <h3>Цифровая платформа Kancher.Tv</h3>
                <p>Онлайн-медиа, 2020-наст.вр.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция образования */}
      <section id="education" className="education-section">
        <div className="container">
          <h2 className="section-title">Образование и навыки</h2>
          <div className="education-content">
            <div className="education-left">
              <h3>Образование</h3>
              <div className="education-item">
                <h4>Московский Государственный Университет</h4>
                <p>Факультет журналистики</p>
                <p>2006-2010</p>
              </div>
              <div className="education-item">
                <h4>Курсы повышения квалификации</h4>
                <p>Цифровые медиатехнологии</p>
                <p>2015, 2018, 2021</p>
              </div>
            </div>
            <div className="education-right">
              <h3>Ключевые навыки</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <span>Продюсирование</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Режиссура</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Монтаж</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>AI-интеграция</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция "Обо мне" */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">Обо мне</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Я - медиа-профессионал с 15-летним опытом работы в телевидении и цифровом производстве. Моя карьера началась в региональном телевидении и привела к созданию собственной продакшн-студии.</p>
              <p>Верю, что медиа - это не просто развлечение, а мощный инструмент влияния и изменения мира. Всегда стремлюсь к инновациям и внедрению передовых технологий в медиапроизводство.</p>
              <p>Создатель цифровой платформы Kancher.Tv - интерактивного портфолио, объединяющего профессиональную информацию с персональной философией.</p>
            </div>
            <div className="about-image"></div>
          </div>
        </div>
      </section>

      {/* Секция контактов */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Контакты</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p><strong>Email:</strong> info@kancher.tv</p>
              <p><strong>Telegram:</strong> @kancher</p>
              <p><strong>LinkedIn:</strong> /in/kancher</p>
            </div>
            <div className="contact-form">
              <form>
                <input type="text" placeholder="Ваше имя" required />
                <input type="email" placeholder="Ваш email" required />
                <textarea placeholder="Сообщение" required></textarea>
                <button type="submit">Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* AI-ассистент */}
      <div id="ai-assistant">
        <div id="ai-header">
          <h3>AI Ассистент</h3>
          <button id="toggle-ai">X</button>
        </div>
        <div id="ai-content">
          <div id="ai-messages"></div>
          <div id="ai-input">
            <input type="text" id="ai-question" placeholder="Задайте вопрос о Сергее Канчере..." />
            <button id="send-question">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isVisible, setIsVisible] = useState({});

  const contactMethods = [
    {
      id: 1,
      title: "Электронная почта",
      value: "info@kancher.tv",
      icon: "✉️",
      link: "mailto:info@kancher.tv"
    },
    {
      id: 2,
      title: "Telegram",
      value: "@kancher",
      icon: "💬",
      link: "https://t.me/kancher"
    },
    {
      id: 3,
      title: "LinkedIn",
      value: "Sergey Kancher",
      icon: "💼",
      link: "https://linkedin.com/in/kancher"
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

    document.querySelectorAll('.contact-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Здесь будет логика отправки формы (в реальном приложении)
      // Для демонстрации просто имитируем успешную отправку
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Сброс сообщения об успехе через 5 секунд
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section py-20 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">Связаться со мной</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div 
            className={`contact-section transform transition-all duration-700 ${
              isVisible.contactInfo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-50px]'
            }`}
            data-section="contactInfo"
          >
            <h3 className="text-2xl font-bold mb-8 text-gradient">Контактная информация</h3>
            
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <a 
                  key={method.id}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                >
                  <div className="text-2xl">{method.icon}</div>
                  <div>
                    <h4 className="font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {method.title}
                    </h4>
                    <p className="text-gray-300">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-8 card">
              <h4 className="text-xl font-bold mb-4 text-gradient">Предпочитаемые способы связи</h4>
              <p className="text-gray-300 mb-4">
                Я обычно отвечаю в течение 24 часов. Для срочных вопросов лучше использовать Telegram.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm">24/7 Online</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Быстрые ответы</span>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Профессиональный подход</span>
              </div>
            </div>
          </div>
          
          {/* Форма обратной связи */}
          <div 
            className={`contact-section transform transition-all duration-700 ${
              isVisible.contactForm ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50px]'
            }`}
            data-section="contactForm"
          >
            <h3 className="text-2xl font-bold mb-8 text-gradient">Отправить сообщение</h3>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-900 text-green-200 rounded-lg">
                Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.
              </div>
            )}
            
            {submitError && (
              <div className="mb-6 p-4 bg-red-900 text-red-200 rounded-lg">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Введите ваше имя"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Введите ваш email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Напишите ваше сообщение..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full text-lg py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              </button>
            </form>
            
            <div className="mt-8 text-sm text-gray-400">
              <p>Ваши данные будут использованы исключительно для связи с вами и не будут переданы третьим лицам.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
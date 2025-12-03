'use client';

import { useState, useEffect, useRef } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Знания ИИ-ассистента о пользователе и его проектах
  const aiKnowledge = {
    general: [
      "Привет! Я ИИ-ассистент Сергея Канчера. Могу ответить на вопросы о его опыте, проектах и философии.",
      "Сергей Канчер - медиа-профессионал с 15+ летним опытом в телевидении и цифровых медиа.",
      "Он специализируется на интерактивных медиаформатах и интеграции ИИ в медиапроизводство."
    ],
    experience: [
      "Опыт работы с 2010 года в различных медиаформатах - от традиционного ТВ до цифровых платформ.",
      "Участие в федеральных телепрограммах и международных медиапроектах.",
      "Создание собственных медиапродуктов и интерактивных форматов."
    ],
    projects: [
      "Kancher.Tv - интерактивное портфолио с интегрированным ИИ-ассистентом.",
      "Музыкальные телепрограммы и онлайн-контент.",
      "Подкаст-платформа и образовательные медиапродукты."
    ],
    philosophy: [
      "Верю в интерактивность медиа - аудитория должна быть не просто зрителем, но и участником процесса.",
      "Технологии должны служить людям, а не наоборот.",
      "Постоянное изучение новых форматов и технологий для улучшения пользовательского опыта."
    ],
    contact: [
      "Связаться с Сергеем можно по email: info@kancher.tv",
      "Также доступен в Telegram: @kancher",
      "Профиль в LinkedIn: Sergey Kancher"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('привет') || lowerCaseMessage.includes('здравствуй')) {
      return aiKnowledge.general[0];
    } else if (lowerCaseMessage.includes('опыт') || lowerCaseMessage.includes('работа') || lowerCaseMessage.includes('карьер')) {
      return aiKnowledge.experience[Math.floor(Math.random() * aiKnowledge.experience.length)];
    } else if (lowerCaseMessage.includes('проект') || lowerCaseMessage.includes('работы') || lowerCaseMessage.includes('портфолио')) {
      return aiKnowledge.projects[Math.floor(Math.random() * aiKnowledge.projects.length)];
    } else if (lowerCaseMessage.includes('философи') || lowerCaseMessage.includes('мисси') || lowerCaseMessage.includes('ценности')) {
      return aiKnowledge.philosophy[Math.floor(Math.random() * aiKnowledge.philosophy.length)];
    } else if (lowerCaseMessage.includes('связь') || lowerCaseMessage.includes('контакт') || lowerCaseMessage.includes('email') || lowerCaseMessage.includes('тг') || lowerCaseMessage.includes('телеграм')) {
      return aiKnowledge.contact[Math.floor(Math.random() * aiKnowledge.contact.length)];
    } else if (lowerCaseMessage.includes('помощь') || lowerCaseMessage.includes('что ты умеешь')) {
      return "Я могу рассказать о профессиональном опыте, проектах, философии и контактной информации Сергея. Просто спросите о чем-то конкретном!";
    } else {
      // Общий ответ, если не найдено соответствие
      return "Я ИИ-ассистент Сергея Канчера. Могу предоставить информацию о его опыте, проектах и философии. Уточните, пожалуйста, что именно вас интересует?";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Имитация задержки для реалистичности
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Случайная задержка от 1 до 2 секунд
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Приветственное сообщение при открытии
      if (messages.length === 0) {
        setTimeout(() => {
          const welcomeMessage = {
            id: Date.now(),
            text: "Привет! Я ИИ-ассистент Сергея Канчера. Чем могу помочь?",
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages([welcomeMessage]);
        }, 300);
      }
    }
  };

  return (
    <>
      {/* Кнопка для открытия/закрытия ассистента */}
      <button
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
        }`}
        aria-label={isOpen ? "Закрыть ИИ-ассистент" : "Открыть ИИ-ассистент"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Окно ИИ-ассистента */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-96 bg-gray-900 border-2 border-cyan-500 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Заголовок */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-2 font-semibold">ИИ-ассистент</span>
            </div>
            <div className="text-sm bg-black bg-opacity-30 px-2 py-1 rounded">
              Kancher.Tv
            </div>
          </div>

          {/* История сообщений */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <div className="text-sm">{message.text}</div>
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-cyan-200' : 'text-gray-400'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Форма ввода */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-3 bg-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
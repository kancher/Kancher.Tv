// Цитаты для случайного показа
const quotes = [
    "«Создаю тренды, а не слежу за ними»",
    "«Магия телевидения и ложь — это разные вещи»",
    "«Моя фигура ждёт свою клеточку»",
    "«Дело, как и любое дело — дело Жизни!»",
    "«Верю в магию, но не в ложь»",
    "«Смешивай краски, ищи новые ростки»"
];

// База знаний для AI ассистента
const knowledgeBase = {
    "проекты": "Сергей работал над множеством проектов: спец-проекты для 2x2, Русская Медиа Группа, музыкальные клипы для Димы Билана, Kamchatka.Camp, реклама для Связного, исполнительный продюсер для канала Пятница (Coca Cola, Venus), Gillette #fistreal, GQ Человек года, сериал Половинки на MTV Россия.",
    
    "опыт": "Опыт работы: Первый Канал (2012-2016) - автор и универсальный специалист, MTV Россия (2011-2012) - промо-продюсер, O2TV (2010-2011) - режиссёр. Также автор на шоу 'Вечерний Ургант'.",
    
    "навыки": "Навыки: режиссура, продюсирование, операторская работа, монтаж, копирайтинг, кризис-менеджмент, работа с талантами, управление проектами.",
    
    "образование": "Образование: Севастопольский национальный технический университет, инженер автомобилей и автомобильного хозяйства.",
    
    "увлечения": "Увлечения: ретро- и электромобили, мото, компьютерные системы, AI, сноуборд, белые стихи, sMnNa.Tv.",
    
    "текущие": "Текущие проекты: '1999.ДЕТИ' - документальный проект о трёхсотлетней войне, 'UPPA' - документальный фильм о виноделе Павле Швеце.",
    
    "ургант": "Сергей был автором на шоу 'Вечерний Ургант' - топовом развлекательном Late Night шоу на Первом Канале.",
    
    "комбайн": "Режим 'комбайна' - это работа универсального специалиста, который решает сверхзадачи от кризис-менеджмента до координации съёмочных групп.",
    
    "контакты": "Контакты: Telegram @KANCHER, Instagram @kancher, YouTube @Kancher"
};

// Случайная цитата при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Случайная цитата
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('random-quote').textContent = randomQuote;

    // Анимация появления элементов при скролле
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('#key-projects .project-card, #projects .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Инициализация AI-чата
    window.aiChat = new AIChat();
});

// Параллакс-эффект для героя
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 500);
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AI Chat Widget - iOS Fixed
class AIChat {
    constructor() {
        this.workerUrl = 'https://kancher-ai-chat.smenatv.workers.dev';
        this.isOpen = false;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.init();
    }

    init() {
        this.bindEvents();
        console.log('AI Chat инициализирован. iOS:', this.isIOS);
    }

    bindEvents() {
        const chatButton = document.getElementById('chat-button');
        const closeChat = document.getElementById('close-chat');
        const sendMessage = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');

        // Универсальные обработчики для всех устройств
        const handleChatButton = (e) => {
            if (e.cancelable) e.preventDefault();
            this.toggleChat();
        };

        const handleCloseChat = (e) => {
            if (e.cancelable) e.preventDefault();
            this.closeChat();
        };

        const handleSendMessage = (e) => {
            if (e.cancelable) e.preventDefault();
            this.sendMessage();
        };

        // Добавляем оба типа событий для надежности
        chatButton.addEventListener('click', handleChatButton);
        chatButton.addEventListener('touchstart', handleChatButton, { passive: false });
        
        closeChat.addEventListener('click', handleCloseChat);
        closeChat.addEventListener('touchstart', handleCloseChat, { passive: false });
        
        sendMessage.addEventListener('click', handleSendMessage);
        sendMessage.addEventListener('touchstart', handleSendMessage, { passive: false });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Закрытие чата при клике вне окна
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !e.target.closest('#chat-widget') && 
                !e.target.closest('#chat-window')) {
                this.closeChat();
            }
        });

        // Для iOS добавляем touchmove предотвращение
        if (this.isIOS) {
            document.addEventListener('touchmove', (e) => {
                if (this.isOpen) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        
        if (this.isOpen) {
            chatWindow.style.display = 'flex';
            // Небольшая задержка для iOS
            setTimeout(() => {
                document.getElementById('chat-input').focus();
            }, 100);
            this.addWelcomeMessage();
        } else {
            this.closeChat();
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chat-window').style.display = 'none';
        // Убираем фокус с инпута
        document.getElementById('chat-input').blur();
    }

    addWelcomeMessage() {
        const messages = document.getElementById('chat-messages');
        if (messages.children.length === 0) {
            this.addMessage('Привет! Я AI-ассистент Сергея Канчера. Спроси меня о проектах, опыте работы, навыках или увлечениях!', 'bot');
        }
    }

    addMessage(text, sender) {
        const messages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messages.appendChild(messageDiv);
        // Прокрутка вниз с задержкой для iOS
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, 50);
    }

    showTyping() {
        const messages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        typingDiv.id = 'typing-indicator';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    findAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Поиск по ключевым словам
        for (const [key, answer] of Object.entries(knowledgeBase)) {
            if (lowerQuestion.includes(key)) {
                return answer;
            }
        }
        
        // Дополнительные проверки для синонимов
        if (lowerQuestion.includes('работа') || lowerQuestion.includes('опыт') || lowerQuestion.includes('карьер')) {
            return knowledgeBase.опыт;
        }
        
        if (lowerQuestion.includes('умеет') || lowerQuestion.includes('может') || lowerQuestion.includes('скил')) {
            return knowledgeBase.навыки;
        }
        
        if (lowerQuestion.includes('учил') || lowerQuestion.includes('образован') || lowerQuestion.includes('вуз')) {
            return knowledgeBase.образование;
        }
        
        if (lowerQuestion.includes('хобби') || lowerQuestion.includes('интерес') || lowerQuestion.includes('увлекает')) {
            return knowledgeBase.увлечения;
        }
        
        if (lowerQuestion.includes('связь') || lowerQuestion.includes('контакт') || lowerQuestion.includes('телеграм') || lowerQuestion.includes('инстаграм')) {
            return knowledgeBase.контакты;
        }
        
        return "Я пока не знаю ответ на этот вопрос. Вы можете спросить о проектах Сергея, его опыте работы, навыках, образовании или увлечениях.";
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Добавляем сообщение пользователя
        this.addMessage(message, 'user');
        input.value = '';
        
        // Показываем индикатор набора
        this.showTyping();

        try {
            // Сначала проверяем локальную базу знаний
            const localAnswer = this.findAnswer(message);
            
            if (localAnswer && !localAnswer.includes("не знаю")) {
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage(localAnswer, 'bot');
                }, 1000);
                return;
            }

            // Если в локальной базе нет ответа, обращаемся к Worker
            console.log('Отправка запроса к:', this.workerUrl);
            
            const response = await fetch(this.workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message,
                    context: "Сергей Канчер - медиа-профессионал с опытом на Первом Канале, MTV Россия, автор шоу 'Вечерний Ургант'. Специализируется на режиссуре, продюсировании, монтаже."
                })
            });

            console.log('Получен ответ:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Данные ответа:', data);
            
            this.hideTyping();
            
            if (data.reply) {
                this.addMessage(data.reply, 'bot');
            } else if (data.error) {
                this.addMessage('Ошибка: ' + data.error, 'bot');
            } else {
                this.addMessage('Извините, произошла непредвиденная ошибка', 'bot');
            }
        } catch (error) {
            console.error('Ошибка чата:', error);
            this.hideTyping();
            // Если произошла ошибка, используем локальный ответ
            const localAnswer = this.findAnswer(message);
            this.addMessage(localAnswer, 'bot');
        }
    }
}

console.log('Kancher.Tv загружен! Добро пожаловать в хронику.');

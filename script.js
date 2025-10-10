// Цитаты для случайного показа
const quotes = [
    "«Создаю тренды, а не слежу за ними»",
    "«Магия телевидения и ложь — это разные вещи»",
    "«Моя фигура ждёт свою клеточку»",
    "«Дело, как и любое дело — дело Жизни!»",
    "«Верю в магию, но не в ложь»",
    "«Смешивай краски, ищи новые ростки»"
];

// Случайная цитата при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Случайная цитата
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('random-quote').textContent = randomQuote;

    // Анимация появления элементов при скролле
    const timelineItems = document.querySelectorAll('.timeline-item');
    
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

// AI Chat Widget - ОРИГИНАЛЬНЫЙ КОД
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
            this.addMessage('Привет! Я AI-ассистент Сергея. Спроси меня о проектах, творчестве или чем-то еще!', 'bot');
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
            console.log('Отправка запроса к:', this.workerUrl);
            
            // Отправляем запрос к нашему Worker
            const response = await fetch(this.workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
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
            this.addMessage('Ошибка соединения. Попробуйте еще раз.', 'bot');
        }
    }
}

console.log('Kancher.Tv загружен! Добро пожаловать в хронику.');

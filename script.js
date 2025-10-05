// Счетчик до запуска
function updateCountdown() {
    const targetDate = new Date('2025-11-04T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        // Время вышло - сайт запущен
        document.querySelector('.countdown').innerHTML = '<div class="countdown-item">🎉 Запущен!</div>';
        document.querySelector('.status').textContent = 'Сайт запущен!';
        return;
    }

    // Расчет времени
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Обновление DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Плавное появление элементов
function initAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        el.style.animationDelay = (index * 0.15) + 's';
    });
}

// Проверка видимости страницы для оптимизации
function setupPageVisibility() {
    let hidden, visibilityChange;
    
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            // Страница не видна - останавливаем частые обновления
            clearInterval(countdownInterval);
            countdownInterval = setInterval(updateCountdown, 30000); // 30 секунд
        } else {
            // Страница видна - обновляем чаще
            clearInterval(countdownInterval);
            updateCountdown(); // Сразу обновляем
            countdownInterval = setInterval(updateCountdown, 1000); // 1 секунда
        }
    }

    if (typeof document.addEventListener !== "undefined" && hidden) {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
}

// AI Chat Widget
class AIChat {
    constructor() {
        this.workerUrl = 'https://kancher-ai-chat.smenatv.workers.dev';
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        console.log('AI Chat инициализирован. Worker URL:', this.workerUrl);
    }

    bindEvents() {
        const chatButton = document.getElementById('chat-button');
        const closeChat = document.getElementById('close-chat');
        const sendMessage = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');

        // Добавляем обработчики для мобильных устройств
        chatButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleChat();
        });
        
        closeChat.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeChat();
        });
        
        sendMessage.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Закрытие чата при клике вне окна
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('#chat-widget')) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        
        if (this.isOpen) {
            chatWindow.style.display = 'flex';
            document.getElementById('chat-input').focus();
            this.addWelcomeMessage();
        } else {
            this.closeChat();
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chat-window').style.display = 'none';
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
        messages.scrollTop = messages.scrollHeight;
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

// Инициализация
let countdownInterval;

document.addEventListener('DOMContentLoaded', function() {
    // Запускаем анимации
    initAnimations();
    
    // Запускаем счетчик сразу
    updateCountdown();
    
    // Настраиваем интервал обновления
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Настраиваем обработчик видимости страницы
    setupPageVisibility();
    
    // Инициализируем AI чат
    setTimeout(() => {
        window.aiChat = new AIChat();
    }, 100);
    
    console.log('Kancher.Tv загружен! Счетчик активен. AI Chat готов.');
});

// Обработчик ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице:', e.error);
});

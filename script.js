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
    "привет": "Привет! Я AI-ассистент Сергея Канчера. Рад вас видеть! Можете спросить меня о его проектах, опыте работы или увлечениях.",
    "здравствуй": "Здравствуйте! Я помогу вам узнать больше о Сергее Канчере - медиа-профессионале с богатым опытом.",
    "hi": "Hello! I'm AI assistant of Sergey Kancher. You can ask me about his projects, work experience or hobbies.",
    "hello": "Hi there! I can tell you about Sergey's media career and creative projects.",
    
    "проекты": "Сергей работал над множеством интересных проектов: спец-проекты для 2x2, Русская Медиа Группа, музыкальные клипы для Димы Билана, детский лагерь Kamchatka.Camp, реклама для Связного, исполнительный продюсер для канала Пятница (Coca Cola, Venus), Gillette #fistreal, GQ Человек года, сериал Половинки на MTV Россия.",
    
    "опыт": "Опыт работы: Первый Канал (2012-2016) - автор и универсальный специалист, MTV Россия (2011-2012) - промо-продюсер, O2TV (2010-2011) - режиссёр. Также автор на шоу 'Вечерний Ургант' - топовом развлекательном Late Night шоу страны.",
    
    "навыки": "Навыки: режиссура, продюсирование, операторская работа, монтаж, разработка концепций, работа с талантами, кризис-менеджмент, управление проектами.",
    
    "образование": "Образование: Севастопольский национальный технический университет (ныне СевГУ), инженер автомобилей и автомобильного хозяйства. Дипломы бакалавра и специалиста.",
    
    "увлечения": "Увлечения: ретро- и электромобили, мото, компьютерные системы, изучение AI, сноуборд, белые стихи, sMnNa.Tv.",
    
    "текущие": "Текущие проекты: '1999.ДЕТИ' - документальный проект-коллаборация с уличным художником Слава ПТРК и группой СБПЧ о трёхсотлетней войне, 'UPPA' - документальный фильм о виноделе Павле Швеце.",
    
    "ургант": "Сергей был автором на шоу 'Вечерний Ургант' - топовом развлекательном Late Night шоу на Первом Канале. Работал в режиме 'комбайна', решая сверхзадачи от кризис-менеджмента до координации съёмочных групп.",
    
    "комбайн": "Режим 'комбайна' - это работа универсального специалиста, который решает сверхзадачи от кризис-менеджмента и работы со звёздами до координации съёмочных групп и продюсирования контента.",
    
    "контакты": "Контакты: Telegram @KANCHER, Instagram @kancher, YouTube @Kancher",
    
    "кто такой": "Сергей Канчер - медиа-профессионал, продюсер, режиссёр с 15-летним опытом работы на федеральных каналах. Универсальный специалист, работавший над проектами для Первого Канала, MTV Россия, 2x2 и многих других.",
    
    "чем занимается": "Сергей занимается созданием медиа-контента: режиссурой, продюсированием, операторской работой, монтажом. Специализируется на разработке новых форматов на стыке цифры и реальности."
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
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
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
    setTimeout(() => {
        window.aiChat = new AIChat();
    }, 1000);
});

// Параллакс-эффект для героя
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / 500);
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// AI Chat Widget
class AIChat {
    constructor() {
        this.workerUrl = 'https://kancher-ai-chat.smenatv.workers.dev';
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        console.log('AI Chat инициализирован');
    }

    bindEvents() {
        const chatButton = document.getElementById('chat-button');
        const closeChat = document.getElementById('close-chat');
        const sendMessage = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');

        chatButton.addEventListener('click', () => this.toggleChat());
        closeChat.addEventListener('click', () => this.closeChat());
        sendMessage.addEventListener('click', () => this.sendMessage());

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
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
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        
        if (this.isOpen) {
            chatWindow.style.display = 'flex';
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

    findAnswer(question) {
        const lowerQuestion = question.toLowerCase().trim();
        
        // Простые приветствия
        if (lowerQuestion.includes('привет') || lowerQuestion.includes('здравств') || 
            lowerQuestion === 'hi' || lowerQuestion === 'hello') {
            return knowledgeBase.привет;
        }
        
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
        
        if (lowerQuestion.includes('кто') || lowerQuestion.includes('что')) {
            return knowledgeBase['кто такой'];
        }
        
        return "Интересный вопрос! Я могу рассказать вам о проектах Сергея, его опыте работы на Первом Канале и MTV, навыках в медиа-производстве, или его увлечениях. Что вас интересует больше?";
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

        // Имитация задержки для более естественного общения
        setTimeout(() => {
            this.hideTyping();
            
            // Всегда сначала используем локальную базу знаний
            const answer = this.findAnswer(message);
            this.addMessage(answer, 'bot');
            
        }, 1000 + Math.random() * 1000);
    }
}

console.log('Kancher.Tv загружен! Добро пожаловать в хронику.');

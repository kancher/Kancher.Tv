// Цитаты для случайного показа
const quotes = [
    "«Магия телевидения и ложь — это разные вещи»",
    "«Дело, как и любое дело — дело Жизни!»", 
    "«Смешивай краски, ищи новые ростки»",
    "«Процесс создания ~ это и есть тот самый МИГ Счастья, а не поскорее слить проект и... что?»",
    "«Телек КруглоСуточный, как и МИР вокруг тебя»",
    "«Хочу не как у всех, но для всех»",
    "«Время ~ единственное, что у нас есть, на секундочку»",
    "«Ищешь везде подвох? А не искать его..Не пробовал/а?»",
    "«Если когда~нибудь Иван Ургант в интервью у меня спросит, на что я потратил девять лет после того, как я от него ушёл ~ отвечу, не тая: 98% времени я потратил на то, чтобы объяснить, чем же я занимаюсь. Потому что «Просто Живу» ~ Ребята почему~то не понимали.»",
    "«Открыл глаза ~ я на работе. Закрыл глаза ~ всё ещё на работе»"
];

// Расширенная база знаний для AI ассистента
const knowledgeBase = {
    "привет": "Привет! Я AI-ассистент Сергея Канчера. Рад вас видеть! Можете спросить меня о его философии, проектах или просто пообщаться на творческие темы.",
    "здравствуй": "Здравствуйте! Я помогу вам узнать Сергея Канчера не только как медиа-профессионала, но и как творческую личность с уникальным взглядом на мир.",
    
    // Философия и подход
    "философия": "Сергей верит, что медиа — это не просто контент, а дело жизни. Он стремится создавать 'живые кадры', а не просиживать штаны. Его подход: 'Магия телевидения и ложь — это разные вещи'.",
    
    "время": "Для Сергея время — 'единственное, что у нас есть на сек ундочку'. Он ценит каждую секунду и не любит тратить время напрасно — ни своё, ни чужое.",
    
    "комбайн": "Режим 'комбайна' — это не просто универсальность. Это философия: быть тем 'секретным болтом', который держит всю систему. От кризис-менеджмента со звёздами до ночного сторожа — всё ради качества продукта.",
    
    "поиск себя": "2016-2025 годы — это не пауза, а глубокое погружение в миры литературы, кино, музыки, наук. Сергей искал ответ на вопрос: 'Для кого и зачем мы делаем медиа?' И нашёл: чтобы не приковывать людей к диванам, а гармонировать цифру с реальностью.",
    
    // Уникальные факты
    "диджей": "До телевидения Сергей был диджеем и арт-директором в клубе 'Премьер' в Севастополе. Его авторские вечеринки всегда собирали аншлаг — он умел 'заряжать' пространство.",
    
    "севастополь": "Сергей — уроженец Города-Героя Севастополя. Как говорил Нахимов: 'Моя семья — мой Флот'. Сергей мечтает о своей семье, но пока его флот — это медиа-проекты.",
    
    "инженер": "По образованию Сергей — инженер автомобилей. Это не случайность: он любит разбираться в том, как всё устроено изнутри — будь то машина или телевизионный эфир.",
    
    "белые стихи": "Сергей пишет белые стихи — без рифмы, но с ритмом. Это отражает его подход к творчеству: искать суть, а не следовать шаблонам.",
    
    "романтика": "Есть в железных дорогах какая-то романтика — эту фразу Сергей написал в поезде Москва-Севастополь, размышляя о своём пути в медиа.",
    
    "ответственность": "Как говорится в мультфильме 'Три Богатыря': 'А ты про ответственность не забыл? Решения судьбоносные, а не только болтать!' — это стало одним из его принципов.",
    
    // Проекты и опыт
    "проекты": "Сергей работал над проектами для 2x2, Русской Медиа Группы, Димы Билана, Kamchatka.Camp, Связного, Пятницы, Gillette, GQ. Но главное — он создавал не просто контент, а 'видео-произведения'.",
    
    "ургант": "На 'Вечернем Урганте' Сергей был тем самым 'секретным болтом' — автором внестудийного контента, который работал в режиме полного цикла: от идеи до эфира.",
    
    "mtv": "На MTV Россия он успел 'в последний вагон' эпохи линейного телевидения. Работа промо-продюсером научила его создавать контент, который 'цепляет'.",
    
    "o2tv": "Первый опыт на O2TV с лозунгом 'Адекватное телевидение для адекватных людей' заложил главный принцип: 'искать живой кадр для Зрителя'.",
    
    // Будущее и технологии
    "ии": "Сергей изучает AI не для 'лопания пузырей в метро', а для понимания будущего медиа. Он верит, что технологии должны возвышать человека, а не превращать в овощей.",
    
    "тренды": "Его подход: 'Не следить за трендами, а создавать их'. Он хочет объединять цифру с реальностью, а не приковывать людей к диванам.",
    
    "медиа будущее": "Сергей видит будущее медиа в персонализации без потери души, в интеграции без потери искренности. Его вопрос: 'Как вы видите стратегию развития телевидения будущего?'",
    
    // Личное
    "увлечения": "Ретро-автомобили, мото, компьютерные системы, AI, сноуборд, белые стихи, sMnNa.Tv — всё это части его поиска гармонии между технологиями и человечностью.",
    
    "принципы": "Искренность выше лоска. Ответственность за судьбоносные решения. Готовность быть 'комбайном'. Вера в магию без лжи.",
    
    "контакты": "Telegram @KANCHER, Instagram @kancher, YouTube @Kancher — но главный контакт это искренний разговор о том, что действительно важно.",
    
    // Дополнительные темы
    "навыки": "Режиссура, продюсирование, операторская работа, монтаж, постановка света, разработка концепций, работа с талантами, кризис-менеджмент, планирование производства.",
    
    "образование": "Севастопольский национальный технический университет (ныне СевГУ), инженер автомобилей и автомобильного хозяйства. Дипломы бакалавра и специалиста.",
    
    "опыт": "Более 15 лет в медиа: Первый канал ('Вечерний Ургант'), MTV Россия, O2TV, Русская Медиа Группа, каналы 2x2 и 'Пятница', работа с брендами Coca Cola, Gillette, Venus, Dirol."
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
        console.log('AI Chat инициализирован');
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

        if (chatButton && closeChat && sendMessage && chatInput) {
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
        } else {
            console.warn('Не все элементы чата найдены');
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        
        if (chatWindow) {
            if (this.isOpen) {
                chatWindow.style.display = 'flex';
                setTimeout(() => {
                    const chatInput = document.getElementById('chat-input');
                    if (chatInput) chatInput.focus();
                }, 100);
                this.addWelcomeMessage();
            } else {
                this.closeChat();
            }
        }
    }

    closeChat() {
        this.isOpen = false;
        const chatWindow = document.getElementById('chat-window');
        const chatInput = document.getElementById('chat-input');
        
        if (chatWindow) chatWindow.style.display = 'none';
        if (chatInput) chatInput.blur();
    }

    addWelcomeMessage() {
        const messages = document.getElementById('chat-messages');
        if (messages && messages.children.length === 0) {
            this.addMessage('Привет! Я AI-ассистент [начинающий] Сергея. Можете пораспрашивать меня о нём, его опыте, навыках, увлечениях! И даже чуть больше, чего нет на сайте😊.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messages = document.getElementById('chat-messages');
        if (messages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.textContent = text;
            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;
        }
    }

    showTyping() {
        const messages = document.getElementById('chat-messages');
        if (messages) {
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
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    findAnswer(question) {
        if (!question || question.trim().length < 2) {
            return "Задайте вопрос подробнее? 😊";
        }
        
        const lowerQuestion = question.toLowerCase().trim();
        console.log('Ищем ответ для:', lowerQuestion);
        
        // Приоритет: точные совпадения
        for (const [key, answer] of Object.entries(knowledgeBase)) {
            if (lowerQuestion === key || lowerQuestion.includes(key)) {
                return answer;
            }
        }
        
        // Расширенный поиск по темам
        const topicMap = {
            'работа|опыт|карьер|проект': knowledgeBase.проекты,
            'умеет|может|скилл|навык': knowledgeBase.навыки,
            'учил|образован|вуз|универ': knowledgeBase.образование,
            'хобби|интерес|увлекает': knowledgeBase.увлечения,
            'связь|контакт|телеграм|инстаграм': knowledgeBase.контакты,
            'философ|принцип|подход': knowledgeBase.философия,
            'ургант|пятница|mtv|o2tv': knowledgeBase.ургант,
            'диджей|музык|клуб': knowledgeBase.диджей,
            'севастополь|город|родина': knowledgeBase.севастополь,
            'инженер|автомобил|техник': knowledgeBase.инженer,
            'поэз|стих|белые': knowledgeBase['белые стихи'],
            'будущ|тренд|технолог': knowledgeBase.тренды,
            'ии|ai|искусственн': knowledgeBase.ии
        };
        
        for (const [pattern, answer] of Object.entries(topicMap)) {
            if (new RegExp(pattern).test(lowerQuestion)) {
                return answer;
            }
        }
        
        // Ответ по умолчанию
        return "Интересный вопрос! Я могу рассказать о проектах Сергея, его опыте в медиа, философии или увлечениях. Что именно вас интересует? 😎";
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;
        
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
            
            // Используем локальную базу знаний
            try {
                const answer = this.findAnswer(message);
                this.addMessage(answer, 'bot');
            } catch (error) {
                console.error('Ошибка при поиске ответа:', error);
                this.addMessage("Что-то пошло не так... Попробуйте задать вопрос по-другому? 🤔", 'bot');
            }
            
        }, 800 + Math.random() * 800);
    }
}

// Функция для тестирования ассистента
function testAIChat() {
    console.log('=== ТЕСТ AI АССИСТЕНТА ===');
    console.log('База знаний:', Object.keys(knowledgeBase).length, 'записей');
    console.log('Цитаты:', quotes.length, 'фраз');
    
    const testQuestions = [
        'привет',
        'расскажи о проектах',
        'какой опыт работы',
        'философия',
        'увлечения',
        'контакты'
    ];
    
    testQuestions.forEach((q, i) => {
        setTimeout(() => {
            const answer = window.aiChat.findAnswer(q);
            console.log(`❓ "${q}"\n✅ ${answer.substring(0, 80)}...`);
        }, i * 200);
    });
}

// Авто-тест при загрузке (можно отключить)
setTimeout(() => {
    if (window.aiChat && console) {
        testAIChat();
    }
}, 2000);

console.log('Kancher.Tv загружен! Добро пожаловать в хронику.');

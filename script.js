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
    "привет": [
        "Привет! Я AI-ассистент Сергея Канчера. Рад вас видеть! Можете спросить меня о его философии, проектах или просто пообщаться на творческие темы.",
        "Здравствуйте! Я помогу вам узнать Сергея Канчера не только как медиа-профессионала, но и как творческую личность с уникальным взглядом на мир.",
        "Приветствую! Готов рассказать о Сергее, его проектах или просто поболтать о жизни и медиа. Что вас интересует? 😊"
    ],
    
    "как дела": [
        "Отлично! Помогаю людям узнать Сергея получше. А у вас как настроение?",
        "Прекрасно! Сергей всегда говорит, что главное - сохранять огонь в сердце. Как ваши дела?",
        "Как в той фразе Сергея: 'Открыл глаза ~ я на работе. Закрыл глаза ~ всё ещё на работе' 😄 А у вас?",
        "Замечательно! Готов общаться. А вы как поживаете?"
    ],
    
    "как жизнь": [
        "Жизнь - это процесс создания, как говорит Сергей! Полна интересных проектов и идей. А у вас что нового?",
        "Прекрасно! Каждый день - это новый МИГ счастья в творчестве. Расскажите, как ваши дела?",
        "Жизнь бьёт ключом! Сергей сейчас в процессе осознания новых проектов. А что интересного у вас?"
    ],
    
    "что делаешь": [
        "Помогаю людям узнать Сергея Канчера лучше! Он ведь не просто медиа-специалист, а целая философия. А вы чем занимаетесь?",
        "Общаюсь с вами! Сергей считает, что искренний разговор - это главный контакт. А вы что сейчас делаете?",
        "Изучаю искусство беседы! Сергей всегда говорит, что важно не только работать, но и жить. А вы?"
    ],

    // Философия и подход
    "философия": [
        "Сергей верит, что медиа — это не просто контент, а дело жизни. Он стремится создавать 'живые кадры', а не просиживать штаны.",
        "Его подход: 'Магия телевидения и ложь — это разные вещи'. Он за искренность в каждом кадре.",
        "Философия Сергея: создавать мощнятские штуки, которые заходят (ну почти!) 💫"
    ],
    
    "время": [
        "Для Сергея время — 'единственное, что у нас есть на секундочку'. Он ценит каждую секунду!",
        "Как говорит Сергей: 'Время ~ единственное, что у нас есть'. Поэтому он не любит тратить его напрасно."
    ],
    
    "комбайн": [
        "Режим 'комбайна' — это не просто универсальность. Это философия: быть тем 'секретным болтом', который держит всю систему.",
        "От кризис-менеджмента со звёздами до ночного сторожа — Сергей готов на всё ради качества продукта. Это и есть комбайн!"
    ],
    
    "поиск себя": [
        "2016-2025 годы — это не пауза, а глубокое погружение в миры литературы, кино, музыки, наук.",
        "Сергей искал ответ на вопрос: 'Для кого и зачем мы делаем медиа?' И нашёл: чтобы гармонировать цифру с реальностью."
    ],
    
    // Уникальные факты
    "диджей": [
        "До телевидения Сергей был диджеем и арт-директором в клубе 'Премьер' в Севастополе.",
        "Его авторские вечеринки всегда собирали аншлаг — он умел 'заряжать' пространство!"
    ],
    
    "севастополь": [
        "Сергей — уроженец Города-Героя Севастополя.",
        "Как говорил Нахимов: 'Моя семья — мой Флот'. Сергей мечтает о своей семье, но пока его флот — это медиа-проекты."
    ],
    
    "инженер": [
        "По образованию Сергей — инженер автомобилей.",
        "Это не случайность: он любит разбираться в том, как всё устроено изнутри — будь то машина или телевизионный эфир."
    ],
    
    "белые стихи": [
        "Сергей пишет белые стихи — без рифмы, но с ритмом.",
        "Это отражает его подход к творчеству: искать суть, а не следовать шаблонам."
    ],
    
    "романтика": [
        "'Есть в железных дорогах какая-то романтика' — эту фразу Сергей написал в поезде Москва-Севастополь.",
        "Он размышлял о своём пути в медиа и находил романтику в самых обычных вещах."
    ],
    
    "ответственность": [
        "Как говорится в мультфильме 'Три Богатыря': 'А ты про ответственность не забыл?'",
        "Для Сергея ответственность за судьбоносные решения — это принцип, а не просто слова."
    ],
    
    // Проекты и опыт
    "проекты": [
        "Сергей работал над проектами для 2x2, Русской Медиа Группы, Димы Билана, Kamchatka.Camp, Связного, Пятницы, Gillette, GQ.",
        "Но главное — он создавал не просто контент, а 'видео-произведения' с душой."
    ],
    
    "ургант": [
        "На 'Вечернем Урганте' Сергей был тем самым 'секретным болтом' — автором внестудийного контента.",
        "Он работал в режиме полного цикла: от идеи до эфира, в том самом режиме 'А ДОМ вообще где?'"
    ],
    
    "mtv": [
        "На MTV Россия он успел 'в последний вагон' эпохи линейного телевидения.",
        "Работа промо-продюсером научила его создавать контент, который 'цепляет'."
    ],
    
    "o2tv": [
        "Первый опыт на O2TV с лозунгом 'Адекватное телевидение для адекватных людей'.",
        "Заложил главный принцип: 'искать живой кадр для Зрителя'."
    ],
    
    // Будущее и технологии
    "ии": [
        "Сергей изучает AI не для 'лопания пузырей в метро', а для понимания будущего медиа.",
        "Он верит, что технологии должны возвышать человека, а не превращать в овощей."
    ],
    
    "тренды": [
        "Его подход: 'Не следить за трендами, а создавать их'.",
        "Он хочет объединять цифру с реальностью, а не приковывать людей к диванам."
    ],
    
    "медиа будущее": [
        "Сергей видит будущее медиа в персонализации без потери души.",
        "Его вопрос: 'Как вы видите стратегию развития телевидения будущего?'"
    ],
    
    // Личное
    "увлечения": [
        "Ретро-автомобили, мото, компьютерные системы, AI, сноуборд, белые стихи, sMnNa.Tv.",
        "Всё это части его поиска гармонии между технологиями и человечностью."
    ],
    
    "принципы": [
        "Искренность выше лоска. Ответственность за судьбоносные решения.",
        "Готовность быть 'комбайном'. Вера в магию без лжи."
    ],
    
    "контакты": [
        "Telegram @KANCHER, Instagram @kancher, YouTube @Kancher.",
        "Но главный контакт это искренний разговор о том, что действительно важно."
    ],
    
    // Дополнительные темы
    "навыки": [
        "Режиссура, продюсирование, операторская работа, монтаж, постановка света.",
        "Разработка концепций, работа с талантами, кризис-менеджмент, планирование производства."
    ],
    
    "образование": [
        "Севастопольский национальный технический университет (ныне СевГУ).",
        "Инженер автомобилей и автомобильного хозяйства. Дипломы бакалавра и специалиста."
    ],
    
    "опыт": [
        "Более 15 лет в медиа: Первый канал ('Вечерний Ургант'), MTV Россия, O2TV.",
        "Русская Медиа Группа, каналы 2x2 и 'Пятница', работа с брендами Coca Cola, Gillette, Venus, Dirol."
    ]
};

// Различные ответы когда AI не знает ответа
const fallbackResponses = [
    "Ой, а вот это уже интересный вопрос! Я пока умею рассказывать в основном о Сергее: его проектах, философии, увлечениях. Может, спросите что-то из этой области? 😊",
    
    "Хм, хороший вопрос! Но я лучше разбираюсь в творческом пути Сергея. Могу рассказать о его работе на Первом канале или в музыкальных клипах?",
    
    "Вот тут я немного плаваю... А знаете, Сергей как-то сказал: 'Ищешь везде подвох? А не искать его... Не пробовал?' Может, просто спросите о его опыте?",
    
    "Интересно! Я пока специализируюсь на медиа-тематике Сергея. Хотите, расскажу о его подходе к созданию контента?",
    
    "Ой, а я тут не силён! Зато могу подробно рассказать о проектах Сергея для 2x2 или Русской Медиа Группы. Интересует?",
    
    "Хм, вы задаете сложные вопросы! Я лучше ориентируюсь в творческой биографии Сергея. Может, спросите о его принципах в работе?",
    
    "Вот это поворот! Я пока учусь и знаю в основном про медиа-производство. Хотите, расскажу как Сергей работает со звёздами?",
    
    "Интересная тема! Но я создан чтобы рассказывать о Сергее Канчере. Может, спросите о его пути от инженера до режиссёра?",
    
    "Ой, а я тут не помощник! Зато знаю всё о философии Сергея в медиа. Хотите послушать?",
    
    "Вот тут я пасую! Но могу рассказать много интересного о работе Сергея с Димой Биланом или на MTV. Выбирайте!",
    
    "Хм, выходит за рамки моей компетенции! А ведь у Сергея столько крутых проектов - может, лучше о них?",
    
    "Интересно, но я пока скромный AI-ассистент Сергея. Могу рассказать о его взглядах на будущее медиа?",
    
    "Ой, а я тут не силён! Зато знаю, как Сергей из диджея стал медиа-продюсером. Хотите эту историю?"
];

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

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    async findAnswer(question) {
        if (!question || question.trim().length < 2) {
            return "Задайте вопрос подробнее? 😊";
        }
        
        const lowerQuestion = question.toLowerCase().trim();
        console.log('Ищем ответ для:', lowerQuestion);
        
        // Сначала проверяем общие вопросы для болтовни
        if (lowerQuestion.includes('привет') || lowerQuestion.includes('здравств') || 
            lowerQuestion === 'hi' || lowerQuestion === 'hello') {
            return this.getRandomResponse(knowledgeBase.привет);
        }
        
        if (lowerQuestion.includes('как дел') || lowerQuestion.includes('как сам') || lowerQuestion.includes('настроен')) {
            return this.getRandomResponse(knowledgeBase['как дела']);
        }
        
        if (lowerQuestion.includes('как жизн') || lowerQuestion.includes('что нов')) {
            return this.getRandomResponse(knowledgeBase['как жизнь']);
        }
        
        if (lowerQuestion.includes('что делаешь') || lowerQuestion.includes('чем занят')) {
            return this.getRandomResponse(knowledgeBase['что делаешь']);
        }
        
        // Поиск по ключевым словам в базе знаний
        for (const [key, answers] of Object.entries(knowledgeBase)) {
            if (lowerQuestion.includes(key)) {
                return this.getRandomResponse(answers);
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
            'инженер|автомобил|техник': knowledgeBase.инженер,
            'поэз|стих|белые': knowledgeBase['белые стихи'],
            'будущ|тренд|технолог': knowledgeBase.тренды,
            'ии|ai|искусственн': knowledgeBase.ии,
            'врем|секунд|час|минут': knowledgeBase.время,
            'комбайн|универсал': knowledgeBase.комбайн,
            'ответственн|судьбоносн': knowledgeBase.ответственность,
            'романт|железнодорож': knowledgeBase.романтика
        };
        
        for (const [pattern, answers] of Object.entries(topicMap)) {
            if (new RegExp(pattern).test(lowerQuestion)) {
                return this.getRandomResponse(answers);
            }
        }
        
        // Если ничего не найдено - случайный fallback ответ
        return this.getRandomResponse(fallbackResponses);
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

        try {
            // Пробуем отправить на Worker для улучшенной обработки
            const response = await this.sendToWorker(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
        } catch (error) {
            console.log('Worker недоступен, используем локальную логику:', error);
            
            // Имитация задержки для более естественного общения
            setTimeout(() => {
                this.hideTyping();
                
                // Используем локальную базу знаний
                try {
                    const answer = this.findAnswer(message);
                    this.addMessage(answer, 'bot');
                } catch (localError) {
                    console.error('Ошибка при поиске ответа:', localError);
                    this.addMessage("Что-то пошло не так... Попробуйте задать вопрос по-другому? 🤔", 'bot');
                }
            }, 800 + Math.random() * 800);
        }
    }

    async sendToWorker(message) {
        if (!this.workerUrl) {
            throw new Error('Worker URL не настроен');
        }

        const response = await fetch(this.workerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                knowledgeBase: knowledgeBase,
                fallbackResponses: fallbackResponses
            })
        });

        if (!response.ok) {
            throw new Error(`Worker responded with status: ${response.status}`);
        }

        const data = await response.json();
        return data.answer;
    }
}

// Функция для тестирования ассистента
function testAIChat() {
    console.log('=== ТЕСТ AI АССИСТЕНТА ===');
    console.log('База знаний:', Object.keys(knowledgeBase).length, 'записей');
    console.log('Цитаты:', quotes.length, 'фраз');
    console.log('Fallback ответы:', fallbackResponses.length, 'вариантов');
    
    const testQuestions = [
        'привет',
        'как дела',
        'расскажи о проектах',
        'какой опыт работы',
        'философия',
        'увлечения',
        'контакты',
        'что такое квантовая физика?', // Должен вызвать fallback
        'как приготовить борщ?' // Должен вызвать fallback
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

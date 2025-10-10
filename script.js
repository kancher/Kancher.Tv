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

    // Инициализация AI-чата (твой существующий код)
    // window.aiChat = new AIChat();
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

console.log('Kancher.Tv загружен! Добро пожаловать в хронику.');

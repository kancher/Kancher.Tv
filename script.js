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
    
    console.log('Kancher.Tv загружен! Счетчик активен.');
});

// Обработчик ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице:', e.error);
});

// Данные сайта (по умолчанию)
let siteData = {
    dailyQuote: "Создавай то, что вдохновляет тебя самого",
    quoteDate: new Date().toLocaleDateString('ru-RU'),
    siteStatus: "Сайт в активной разработке",
    launchDate: "2025-11-04",
    socialLinks: {
        telegram: "#",
        youtube: "#", 
        instagram: "#"
    }
};

// Загрузка данных из LocalStorage
function loadData() {
    const saved = localStorage.getItem('kancherTvData');
    if (saved) {
        siteData = { ...siteData, ...JSON.parse(saved) };
    }
    updateUI();
}

// Обновление интерфейса
function updateUI() {
    // Фраза дня
    document.getElementById('daily-quote').textContent = siteData.dailyQuote;
    document.getElementById('quote-date').textContent = siteData.quoteDate;
    
    // Счетчик
    updateCountdown();
    
    // Соцсети
    updateSocialLinks();
}

// Счетчик до запуска
function updateCountdown() {
    const targetDate = new Date(siteData.launchDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    } else {
        document.querySelector('.countdown-section').innerHTML = '<h3>🎉 Сайт запущен!</h3>';
    }
}

// Обновление соцсетей
function updateSocialLinks() {
    const links = document.querySelectorAll('.social-link');
    links[0].href = siteData.socialLinks.telegram;
    links[1].href = siteData.socialLinks.youtube;
    links[2].href = siteData.socialLinks.instagram;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setInterval(updateCountdown, 60000); // Обновлять каждую минуту
});

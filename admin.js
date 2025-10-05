// Проверка поддержки LocalStorage
function isLocalStorageSupported() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Универсальное сохранение
function saveData(data) {
    if (isLocalStorageSupported()) {
        localStorage.setItem('kancherTvData', JSON.stringify(data));
        return true;
    } else {
        showStatus('LocalStorage недоступен. Скопируйте данные:', 'error');
        console.log('Данные для копирования:', JSON.stringify(data, null, 2));
        return false;
    }
}

// Универсальная загрузка
function loadData() {
    if (isLocalStorageSupported()) {
        return localStorage.getItem('kancherTvData');
    }
    return null;
}

// Загрузка данных в админку
function loadAdminData() {
    const saved = loadData();
    
    // Данные по умолчанию
    const defaultData = {
        dailyQuote: "Создавай то, что вдохновляет тебя самого",
        siteStatus: "Сайт в активной разработке", 
        launchDate: "2025-11-04",
        socialLinks: {
            telegram: "#",
            youtube: "#",
            instagram: "#"
        }
    };

    if (saved) {
        const data = JSON.parse(saved);
        // Объединяем с default данными (на случай новых полей)
        const mergedData = { ...defaultData, ...data };
        
        document.getElementById('quote-input').value = mergedData.dailyQuote || '';
        document.getElementById('status-input').value = mergedData.siteStatus || '';
        document.getElementById('launch-date').value = mergedData.launchDate || '2025-11-04';
        document.getElementById('telegram-link').value = mergedData.socialLinks?.telegram || '';
        document.getElementById('youtube-link').value = mergedData.socialLinks?.youtube || '';
        document.getElementById('instagram-link').value = mergedData.socialLinks?.instagram || '';
    } else {
        // Используем default данные
        document.getElementById('quote-input').value = defaultData.dailyQuote;
        document.getElementById('status-input').value = defaultData.siteStatus;
        document.getElementById('launch-date').value = defaultData.launchDate;
        document.getElementById('telegram-link').value = defaultData.socialLinks.telegram;
        document.getElementById('youtube-link').value = defaultData.socialLinks.youtube;
        document.getElementById('instagram-link').value = defaultData.socialLinks.instagram;
    }
    
    updatePreview();
}

// Обновление фразы дня
function updateQuote() {
    const quote = document.getElementById('quote-input').value.trim();
    if (!quote) {
        showStatus('Введите фразу!', 'error');
        return;
    }

    const saved = loadData();
    const data = saved ? JSON.parse(saved) : {};
    
    data.dailyQuote = quote;
    data.quoteDate = new Date().toLocaleDateString('ru-RU');
    
    if (saveData(data)) {
        showStatus('Фраза дня обновлена!', 'success');
        updatePreview();
    }
}

// Обновление статуса
function updateStatus() {
    const status = document.getElementById('status-input').value.trim();
    const launchDate = document.getElementById('launch-date').value;

    const saved = loadData();
    const data = saved ? JSON.parse(saved) : {};
    
    data.siteStatus = status;
    data.launchDate = launchDate;
    
    if (saveData(data)) {
        showStatus('Настройки сохранены!', 'success');
        updatePreview();
    }
}

// Обновление ссылок
function updateLinks() {
    const telegram = document.getElementById('telegram-link').value.trim();
    const youtube = document.getElementById('youtube-link').value.trim();
    const instagram = document.getElementById('instagram-link').value.trim();

    const saved = loadData();
    const data = saved ? JSON.parse(saved) : {};
    
    if (!data.socialLinks) data.socialLinks = {};
    data.socialLinks.telegram = telegram || '#';
    data.socialLinks.youtube = youtube || '#';
    data.socialLinks.instagram = instagram || '#';
    
    if (saveData(data)) {
        showStatus('Ссылки обновлены!', 'success');
        updatePreview();
    }
}

// Превью данных
function updatePreview() {
    const saved = loadData();
    const defaultData = {
        dailyQuote: "Создавай то, что вдохновляет тебя самого",
        siteStatus: "Сайт в активной разработке",
        launchDate: "2025-11-04"
    };
    
    if (saved) {
        const data = JSON.parse(saved);
        const mergedData = { ...defaultData, ...data };
        
        document.getElementById('preview-quote').textContent = mergedData.dailyQuote;
        document.getElementById('preview-status').textContent = mergedData.siteStatus;
        document.getElementById('preview-launch').textContent = mergedData.launchDate;
    } else {
        document.getElementById('preview-quote').textContent = defaultData.dailyQuote;
        document.getElementById('preview-status').textContent = defaultData.siteStatus;
        document.getElementById('preview-launch').textContent = defaultData.launchDate;
    }
}

// Экспорт данных
function exportData() {
    const data = loadData();
    if (!data) {
        showStatus('Нет данных для экспорта', 'error');
        return;
    }
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kancher-tv-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Данные экспортированы!', 'success');
}

// Импорт данных
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                if (saveData(data)) {
                    loadAdminData();
                    showStatus('Данные импортированы!', 'success');
                }
            } catch (err) {
                showStatus('Ошибка при импорте файла', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Сброс данных
function resetData() {
    if (confirm('Точно сбросить все данные к default?')) {
        if (isLocalStorageSupported()) {
            localStorage.removeItem('kancherTvData');
        }
        loadAdminData();
        showStatus('Данные сброшены!', 'success');
    }
}

// Показать статус
function showStatus(message, type) {
    const statusEl = document.getElementById('quote-status');
    statusEl.textContent = message;
    statusEl.style.color = type === 'success' ? '#4CAF50' : '#f44336';
    statusEl.style.display = 'block';
    
    setTimeout(() => {
        statusEl.textContent = '';
        statusEl.style.display = 'none';
    }, 3000);
}

// Инициализация админки
document.addEventListener('DOMContentLoaded', loadAdminData);

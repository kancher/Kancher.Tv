// Загрузка данных в админку
function loadAdminData() {
    const saved = localStorage.getItem('kancherTvData');
    if (saved) {
        const data = JSON.parse(saved);
        
        document.getElementById('quote-input').value = data.dailyQuote || '';
        document.getElementById('status-input').value = data.siteStatus || '';
        document.getElementById('launch-date').value = data.launchDate || '2025-03-01';
        document.getElementById('telegram-link').value = data.socialLinks?.telegram || '';
        document.getElementById('youtube-link').value = data.socialLinks?.youtube || '';
        document.getElementById('instagram-link').value = data.socialLinks?.instagram || '';
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

    const saved = localStorage.getItem('kancherTvData');
    const data = saved ? JSON.parse(saved) : {};
    
    data.dailyQuote = quote;
    data.quoteDate = new Date().toLocaleDateString('ru-RU');
    
    localStorage.setItem('kancherTvData', JSON.stringify(data));
    showStatus('Фраза дня обновлена!', 'success');
    updatePreview();
}

// Обновление статуса
function updateStatus() {
    const status = document.getElementById('status-input').value.trim();
    const launchDate = document.getElementById('launch-date').value;

    const saved = localStorage.getItem('kancherTvData');
    const data = saved ? JSON.parse(saved) : {};
    
    data.siteStatus = status;
    data.launchDate = launchDate;
    
    localStorage.setItem('kancherTvData', JSON.stringify(data));
    showStatus('Настройки сохранены!', 'success');
    updatePreview();
}

// Обновление ссылок
function updateLinks() {
    const telegram = document.getElementById('telegram-link').value.trim();
    const youtube = document.getElementById('youtube-link').value.trim();
    const instagram = document.getElementById('instagram-link').value.trim();

    const saved = localStorage.getItem('kancherTvData');
    const data = saved ? JSON.parse(saved) : {};
    
    if (!data.socialLinks) data.socialLinks = {};
    data.socialLinks.telegram = telegram || '#';
    data.socialLinks.youtube = youtube || '#';
    data.socialLinks.instagram = instagram || '#';
    
    localStorage.setItem('kancherTvData', JSON.stringify(data));
    showStatus('Ссылки обновлены!', 'success');
    updatePreview();
}

// Превью данных
function updatePreview() {
    const saved = localStorage.getItem('kancherTvData');
    if (saved) {
        const data = JSON.parse(saved);
        
        document.getElementById('preview-quote').textContent = data.dailyQuote || 'Не установлено';
        document.getElementById('preview-status').textContent = data.siteStatus || 'Не установлено';
        document.getElementById('preview-launch').textContent = data.launchDate || 'Не установлено';
    }
}

// Экспорт данных
function exportData() {
    const data = localStorage.getItem('kancherTvData');
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
                localStorage.setItem('kancherTvData', JSON.stringify(data));
                loadAdminData();
                showStatus('Данные импортированы!', 'success');
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
        localStorage.removeItem('kancherTvData');
        loadAdminData();
        showStatus('Данные сброшены!', 'success');
    }
}

// Показать статус
function showStatus(message, type) {
    const statusEl = document.getElementById('quote-status');
    statusEl.textContent = message;
    statusEl.style.color = type === 'success' ? '#4CAF50' : '#f44336';
    
    setTimeout(() => {
        statusEl.textContent = '';
    }, 3000);
}

// Инициализация админки
document.addEventListener('DOMContentLoaded', loadAdminData);

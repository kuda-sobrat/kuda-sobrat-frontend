export function formatTimeIntl(dateInput: Date, locale = 'ru-RU') {
    const date = new Date(dateInput)

    if (isNaN(date.getTime())) {
        throw new Error('Недопустимый формат даты');
    }

    const formatter = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

    return formatter.format(date)
}

export function formatDateDayOfWeekIntl(dateInput: Date, locale = 'ru-RU') {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
        throw new Error('Недопустимый формат даты');
    }

    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric'
    })

    let formattedDate = formatter.format(date)

    // Делаем первую букву заглавной
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

    return formattedDate
}

/**
 * Копирует переданный текст в буфер обмена.
 * Поддерживает все современные браузеры, включая более старые версии.
 *
 * @param {string} text - Текст для копирования в буфер обмена.
 */
export function copyToClipboard(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Используем современный Clipboard API
        navigator.clipboard.writeText(text).then(function() {
            console.log('Текст успешно скопирован в буфер обмена.');
        }).catch(function(err) {
            console.error('Ошибка при копировании текста:', err);
            console.log('Попытка скопировать текст с использованием устаревшего метода.');
            // Используем устаревший метод в случае ошибки
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Используем устаревший метод, если Clipboard API недоступен
        fallbackCopyTextToClipboard(text);
    }
}

/**
 * Устаревший метод копирования текста в буфер обмена с использованием document.execCommand('copy').
 *
 * @param {string} text - Текст для копирования в буфер обмена.
 */
export function fallbackCopyTextToClipboard(text: string) {
    // Создаем временное текстовое поле
    var textArea = document.createElement("textarea");

    // Стили для скрытия элемента из области видимости
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        if (successful) {
            console.log('Текст успешно скопирован в буфер обмена устаревшим методом.');
        } else {
            console.error('Не удалось скопировать текст устаревшим методом.');
        }
    } catch (err) {
        console.error('Ошибка при копировании текста устаревшим методом:', err);
    }

    // Удаляем временное текстовое поле
    document.body.removeChild(textArea);
}
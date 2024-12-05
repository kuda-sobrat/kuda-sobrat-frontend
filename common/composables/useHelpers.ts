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
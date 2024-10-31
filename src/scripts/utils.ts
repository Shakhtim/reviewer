//базовый URL
export const BASE_URL = 'http://localhost:3001';

//валидация формы
interface ErrorTexts {
    [key: string]: string;
}

//валидация ошибок
export const validateErrors = (errors: ErrorTexts): boolean => {
    for (const key in errors) {
        if (errors[key].trim() !== '') {
            return false;
        }
    }
    return true;
};

//валидация логина
export const validateLogin = (login: string): string => {
    let errorMessage = '';

    const regex = /^[A-Za-z0-9_]+$/;

    if (!regex.test(login)) {
        errorMessage = 'Недопустимое значение для логина';
    }

    if (login.trim() === '') {
        errorMessage = 'Логин обязателен для заполнения';
    }

    return errorMessage;
};

//валидация пароля
export const validatePassword = (password: string): string => {
    let errorMessage = '';

    const regex = /^[A-Za-z0-9_]+$/;

    if (!regex.test(password)) {
        errorMessage = 'Недопустимое значение для пароля';
    }

    if (password.trim() === '') {
        errorMessage = 'Пароль обязателен для заполнения';
    }

    return errorMessage;
};

// Функция для форматирования даты
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`; // Возвращаем форматированную строку
}

//склонение отзывов
export const getReviewWord = (count: number): string => {
    if (count % 10 === 1 && count % 100 !== 11) {
        return count + " " +'отзыв';
    } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
        return count + " " +'отзыва';
    } else {
        return count + " " +'отзывов';
    }
}

// Функция для получения случайных элементов из массива
export const getRandomItems = (array: any[], count: number): any[] => {
    // Копируем массив, чтобы не изменять оригинал
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};



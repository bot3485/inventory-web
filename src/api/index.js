import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://172.30.10.12:9443/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// --- ПЕРЕХВАТЧИК ЗАПРОСА (REQUEST) ---
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// --- ПЕРЕХВАТЧИК ОТВЕТА (RESPONSE) ---
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Проверяем 401 ошибку (Unauthorized)
        if (error.response && error.response.status === 401) {
            
            // ПРОВЕРКА: Если мы уже на странице логина, не нужно редиректить по кругу
            const isLoginPage = window.location.pathname === '/login';

            if (!isLoginPage) {
                console.warn('Сессия истекла. Очистка токена и переход на логин...');
                
                // 1. Очищаем токен
                localStorage.removeItem('token');

                // 2. Редирект
                // Используем href для полной очистки памяти Pinia/Vue
                window.location.href = '/login';
            }
        }

        // Важно: всегда возвращаем Promise.reject, чтобы catch в сторах продолжал работать
        return Promise.reject(error);
    }
);

export default api;
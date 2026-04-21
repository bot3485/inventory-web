import api from './index';

export const authService = {
    /**
     * Авторизация пользователя
     * @param {Object} credentials - логин и пароль
     */
    async login(credentials) {
        // Отправляем запрос на бэкенд
        const { data } = await api.post('/login', credentials);
        
        // Если бэкенд вернул токен, сохраняем его в браузер
        if (data && data.token) {
            localStorage.setItem('token', data.token);
        }
        
        return data;
    },

    /**
     * Выход из системы "как у профи"
     */
    async logout() {
        try {
            // 1. Пытаемся удалить токен в базе данных Postgres (Laravel Sanctum)
            // Axios сам подставит текущий токен в заголовок Bearer
            await api.post('/logout'); 
        } catch (e) {
            // 2. Если токен уже невалиден или сервер недоступен — 
            // просто логируем, но не останавливаем процесс выхода
            console.warn('Backend logout failed, proceeding with local cleanup');
        } finally {
            // 3. В ЛЮБОМ СЛУЧАЕ чистим локальные следы
            localStorage.removeItem('token');
            
            // 4. Жесткий редирект. Это обнуляет состояние Pinia и Vue,
            // исключая утечку данных предыдущего пользователя.
            window.location.href = '/login'; 
        }
    }
};
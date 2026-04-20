import api from './index';

export const userService = {
    // Получить список (с поддержкой фильтров QueryBuilder)
    // Пример: { 'filter[name]': 'ivan', sort: '-created_at' }
    async getAll(params = {}) {
        const { data } = await api.get('/users', { params });
        return data; // Вернет { data: [...], meta: {...}, links: {...} }
    },

    // Получить одного
    async getById(id) {
        const { data } = await api.get(`/users/${id}`);
        return data.data;
    },

    // Создать
    async create(userData) {
        return await api.post('/users', userData);
    },

    // Обновить
    async update(id, userData) {
        return await api.put(`/users/${id}`, userData);
    },

    // Удалить
    async delete(id) {
        return await api.delete(`/users/${id}`);
    }
};
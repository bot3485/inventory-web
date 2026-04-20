import api from './index';

export const locationService = {
    // Получить список (с поддержкой фильтров QueryBuilder)
    // Пример: { 'filter[name]': 'ivan', sort: '-created_at' }
    async getAll(params = {}) {
        const { data } = await api.get('/locations', { params });
        return data; // Вернет { data: [...], meta: {...}, links: {...} }
    },

    // Получить одного
    async getById(id) {
        const { data } = await api.get(`/locations/${id}`);
        return data.data;
    },

    // Создать
    async create(userData) {
        return await api.post('/locations', userData);
    },

    // Обновить
    async update(id, userData) {
        return await api.put(`/locations/${id}`, userData);
    },

    // Удалить
    async delete(id) {
        return await api.delete(`/locations/${id}`);
    }
};
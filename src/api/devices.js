import api from './index'; // Твой сконфигурированный axios

const resource = '/devices';

export default {
    index(params) {
        return api.get(resource, { params });
    },
    store(data) {
        return api.post(resource, data);
    },
    show(id) {
        return api.get(`${resource}/${id}`);
    },
    update(id, data) {
        return api.put(`${resource}/${id}`, data);
    },
    destroy(id) {
        return api.delete(`${resource}/${id}`);
    }
};
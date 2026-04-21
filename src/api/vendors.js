import api from './index';
export default {
    index: () => api.get('/vendors'),
    show: (id) => api.get(`/vendors/${id}`)
};
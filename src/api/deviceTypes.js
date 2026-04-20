import api from './index';
export default {
    index: () => api.get('/device-types'),
    show: (id) => api.get(`/device-types/${id}`)
};
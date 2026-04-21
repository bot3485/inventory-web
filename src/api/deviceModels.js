import api from './index';
export default {
    index: (params) => api.get('/device-models', { params }),
    show: (id) => api.get(`/device-models/${id}`)
};
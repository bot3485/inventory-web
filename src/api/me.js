import api from './index'; // Твой сконфигурированный axios

const resource = '/me';

export default {
    index() {
        return api.get(resource);
    }
};
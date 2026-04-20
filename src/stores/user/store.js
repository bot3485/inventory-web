import { defineStore } from 'pinia';
import api from '@/api/index';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        items: [],
        loading: false
    }),

    actions: {
        async fetchItems() {
            this.loading = true;
            try {
                const response = await api.get('/users');
                this.items = response.data.data;
            } catch (error) {
                console.error("Ошибка загрузки пользователей:", error);
            } finally {
                this.loading = false;
            }
        }
    }
});
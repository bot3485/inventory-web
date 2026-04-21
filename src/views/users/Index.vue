<template>
    <div class="user-list">
        <h2>Управление пользователями</h2>

        <div class="actions">
            <input v-model="searchQuery" @input="fetchUsers" placeholder="Поиск (имя или email)...">
            <router-link :to="{ name: 'UserCreate' }">Добавить пользователя</router-link>
        </div>

        <table border="1" width="100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <router-link :to="{ name: 'UserEdit', params: { id: user.id } }">Редактировать</router-link>
                        <button @click="confirmDelete(user)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userService } from '@/api/users';

const users = ref([]);
const searchQuery = ref('');

const fetchUsers = async () => {
    const params = searchQuery.value ? { 'filter[search]': searchQuery.value } : {};
    const response = await userService.getAll(params);
    users.value = response.data;
};

const confirmDelete = async (user) => {
    if (confirm(`Удалить пользователя ${user.name}?`)) {
        await userService.delete(user.id);
        fetchUsers(); // Обновляем список
    }
};

onMounted(fetchUsers);
</script>
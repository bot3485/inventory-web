<template>
    <div class="user-form">
        <h2>{{ isEdit ? 'Редактировать' : 'Создать' }} пользователя</h2>

        <form @submit.prevent="saveUser">
            <div>
                <label>Имя:</label>
                <input v-model="form.name" required>
            </div>
            <div>
                <label>Email:</label>
                <input v-model="form.email" type="email" required>
            </div>
            <div v-if="!isEdit">
                <label>Пароль:</label>
                <input v-model="form.password" type="password" required>
            </div>

            <button type="submit">{{ isEdit ? 'Обновить' : 'Создать' }}</button>
            <router-link to="/users">Отмена</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userService } from '@/api/users';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const isEdit = computed(() => !!id);

const form = ref({
    name: '',
    email: '',
    password: ''
});

onMounted(async () => {
    if (isEdit.value) {
        const user = await userService.getById(id);
        form.value.name = user.name;
        form.value.email = user.email;
    }
});

const saveUser = async () => {
    try {
        if (isEdit.value) {
            await userService.update(id, form.value);
        } else {
            await userService.create(form.value);
        }
        router.push('/users');
    } catch (error) {
        alert('Ошибка при сохранении: ' + error.response.data.message);
    }
};
</script>
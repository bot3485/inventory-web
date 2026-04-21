<template>
    <div class="login-page">
        <h1>Вход в систему</h1>
        <form @submit.prevent="onLogin">
            <input v-model="form.email" type="email" placeholder="Email" required>
            <input v-model="form.password" type="password" placeholder="Пароль" required>
            <button type="submit">Войти</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '@/api/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ email: '', password: '' });

const onLogin = async () => {
    try {
        await authService.login(form.value);
        router.push('/');
    } catch (e) {
        alert('Ошибка входа!');
    }
};
</script>
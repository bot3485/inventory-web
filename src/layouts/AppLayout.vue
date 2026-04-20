<template>
    <div class="app-layout">
        <nav>
            <router-link :to="{ name: 'Dashboard' }">Дашборд</router-link> |

            <router-link :to="{ name: 'UserList' }">Пользователи</router-link> |

            <router-link :to="{ name: 'Locations' }">Локации</router-link> |

            <router-link :to="{ name: 'Devices' }">Devices</router-link> |

            <router-link :to="{ name: 'Me' }">me</router-link> |

            <button @click="handleLogout">Выйти</button>
        </nav>
        <hr>

        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { authService } from '@/api/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
};
</script>
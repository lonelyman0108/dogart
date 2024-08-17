import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/components/Index.vue'),
            redirect: 'words',
            children: [
                {
                    path: '/words',
                    name: 'words',
                    component: () => import('@/components/view/Words.vue')
                },
                {
                    path: '/diary',
                    name: 'diary',
                    component: () => import('@/components/view/Diary.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/admin/Login.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            redirect: '/admin/words',
            children: [
                {
                    path: '/admin/words',
                    name: 'admin-words',
                    component: () => import('@/components/admin/Words.vue')
                },
                {
                    path: '/admin/diary',
                    name: 'admin-diary',
                    component:() => import('@/components/admin/Articles.vue')
                }
            ]
        }
    ]
})

export default router

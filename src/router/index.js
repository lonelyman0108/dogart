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
                    component: () => import('@/components/Words.vue')
                },
                {
                    path: '/articles',
                    name: 'articles',
                    component: () => import('@/components/Articles.vue')
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
                    path: '/admin/articles',
                    name: 'admin-articles',
                    component:() => import('@/components/admin/Articles.vue')
                }
            ]
        }
    ]
})

export default router

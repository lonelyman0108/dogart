import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/components/Index.vue'),
            redirect: 'contentIndex',
            children: [
                {
                    path: '/',
                    name: 'content-index',
                    component: () => import('@/components/view/Index.vue'),
                    redirect: '/words',
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
                    component: () => import('@/components/view/admin/Login.vue')
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: () => import('@/components/view/admin/Index.vue'),
                    redirect: '/admin/words',
                    children: [
                        {
                            path: '/admin/words',
                            name: 'admin-words',
                            component: () => import('@/components/view/admin/Words.vue')
                        },
                        {
                            path: '/admin/diary',
                            name: 'admin-diary',
                            component:() => import('@/components/view/admin/Diary.vue')
                        }
                    ]
                }
            ]
        }
    ]
})

export default router

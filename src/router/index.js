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
                    component: () => import('@/components/view/common/Index.vue'),
                    redirect: '/words',
                    children: [
                        {
                            path: '/words',
                            name: 'words',
                            component: () => import('@/components/view/common/Words.vue')
                        },
                        {
                            path: '/diary',
                            name: 'diary',
                            component: () => import('@/components/view/common/Diary.vue')
                        }
                    ]
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/components/view/Login.vue')
                },
                {
                    path: '/admin',
                    name: 'admin-index',
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
                        },
                        {
                            path: '/admin/setting',
                            name: 'admin-setting',
                            component: () => import('@/components/view/admin/Setting.vue')
                        }
                    ]
                }
            ]
        }
    ]
})


export default router

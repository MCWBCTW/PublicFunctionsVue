import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue'), // 建议进行路由懒加载，优化访问性能
        children: [
            {
                path: '',
                name: 'uploadLargeFiles',
                component: () => import('../views/children/uploadLargeFiles.vue'),
                meta: {
                    requireAuth: true,
                    keepAlive: true,
                }
            },
            {
                path: '/vidoeWebRTC',
                name: 'vidoeWebRTC',
                component: () => import('../views/children/vidoeWebRTC.vue'),
                meta: {
                    requireAuth: true,
                    keepAlive: true,
                }
            },
            {
                path: '/virtualScrolling',
                name: 'virtualScrolling',
                component: () => import('../views/children/virtualScrolling.vue'),
                meta: {
                    requireAuth: true,
                    keepAlive: true,
                }
            },
        ]
    },
]

const router = createRouter({
  // history: createWebHistory(),    // 使用history模式
  history: createWebHashHistory(),	 // 使用hash模式
  routes
})

export default router
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
          },
          {
            path: '/vidoeWebRTC',
            name: 'vidoeWebRTC',
            component: () => import('../views/children/vidoeWebRTC.vue'),
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
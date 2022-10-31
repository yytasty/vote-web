import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../pages/home.vue')
  },
  {
    path: '/player/list',
    name: '选手管理',
    component: () => import('../pages/player/list.vue') 
  },
  {
    path: '/player/add',
    name: '添加选手',
    component: () => import('../pages/player/add.vue') 
  },
  {
    path: '/score/list',
    name: '评分规则',
    component: () => import('../pages/score/list.vue') 
  },
  {
    path: '/score/add',
    name: '创建评分项',
    component: () => import('../pages/score/add.vue') 
  },
  {
    path: '/statistics',
    name: '统计设置',
    component: () => import('../pages/statistics/index.vue') 
  },
  {
    path: '/rank',
    name: '选手排名',
    component: () => import('../pages/rank/index.vue') 
  },
  {
    path: '/vote/list',
    name: '投票首页',
    component: () => import('../pages/vote/list.vue') 
  },
  {
    path: '/vote/addMinute',
    name: '投票详情',
    component: () => import('../pages/vote/addMinute.vue') 
  },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if(to.name){
    document.title = to.name
  }
  next()
  
})
// 导出路由
export default router
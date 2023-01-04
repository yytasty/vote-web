import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: '首页',
    component: () => import('../pages/home.vue'),
  },
  {
    path: '/player/list',
    name: '选手管理',
    component: () => import('../pages/player/list.vue'),
  },
  {
    path: '/player/add',
    name: '添加选手',
    component: () => import('../pages/player/add.vue'),
  },
  {
    path: '/score/list',
    name: '评分规则',
    component: () => import('../pages/score/list.vue'),
  },
  {
    path: '/score/add',
    name: '创建评分项',
    component: () => import('../pages/score/add.vue'),
  },
  {
    path: '/statistics',
    name: '统计设置',
    component: () => import('../pages/statistics/index.vue'),
  },
  {
    path: '/judgeRole/list',
    name: '评委角色',
    component: () => import('../pages/judgeRole/list.vue'),
  },
  {
    path: '/judgeRole/add',
    name: '添加角色',
    component: () => import('../pages/judgeRole/add.vue'),
  },
  {
    path: '/judgeRole/select',
    name: '选择角色',
    component: () => import('../pages/judgeRole/select.vue'),
  },
  {
    path: '/rank',
    name: '选手排名',
    component: () => import('../pages/rank/index.vue'),
  },
  {
    path: '/vote/list',
    name: '选手列表',
    component: () => import('../pages/vote/list.vue'),
  },
  {
    path: '/vote/addMinute',
    name: '评分',
    component: () => import('../pages/vote/addMinute.vue'),
  },
  {
    path: '/vote/log',
    name: '评分记录',
    component: () => import('../pages/vote/log.vue'),
  },
  {
    path: '/vote/score',
    name: '分数',
    component: () => import('../pages/vote/score.vue'),
  },
  {
    path: '/judge/add',
    name: '添加人员',
    component: () => import('../pages/judge/add.vue'),
  },
  {
    path: '/judge/list',
    name: '人员列表',
    component: () => import('../pages/judge/list.vue'),
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('../pages/login/index.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name;
  }
  next();
});
// 导出路由
export default router;

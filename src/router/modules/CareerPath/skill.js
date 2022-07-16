const Layout = () => import('@/layout/index.vue')

export default {
    path: '/job_hunting_skill',
    component: Layout,
    name: 'job_hunting_skill',
    redirect: '/job_hunting_skill',
    meta: {
        title: '求职技巧',
        icon: 'skill'
    },
    children: [
        {
            path: '',
            name: 'job_hunting_skill_index',
            component: () => import('@/views/CareerPath/article/index.vue'),
            meta: {
                title: '求职技巧',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/job_hunting_skill'
            }
        },
        {
            path: 'detail/:id',
            name: 'job_hunting_skill_detail',
            component: () => import('@/views/CareerPath/article/detail.vue'),
            meta: {
                title: '文章详情',
                sidebar: false,
                activeMenu: '/job_hunting_skill'
            }
        },
    ]
}

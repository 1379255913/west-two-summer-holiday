const Layout = () => import('@/layout/index.vue')

export default {
    path: '/general_skill',
    component: Layout,
    name: 'general_skill',
    redirect: '/general_skill',
    meta: {
        title: '通用技能',
        icon: 'gskill',
        detail: 'general_skill_detail'
    },
    children: [
        {
            path: '',
            name: 'general_skill_index',
            component: () => import('@/views/CareerPath/article/index.vue'),
            meta: {
                title: '通用技能',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/general_skill'
            }
        },
        {
            path: 'detail/:id',
            name: 'general_skill_detail',
            component: () => import('@/views/CareerPath/article/detail.vue'),
            meta: {
                title: '文章详情',
                sidebar: false,
                activeMenu: '/general_skill'
            }
        },
    ]
}

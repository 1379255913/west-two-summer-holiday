const Layout = () => import('@/layout/index.vue')

export default {
    path: '/tool_recommendation',
    component: Layout,
    name: 'tool_recommendation',
    redirect: '/tool_recommendation',
    meta: {
        title: '工具推荐',
        icon: 'tool',
        detail: 'tool_recommendation_detail'
    },
    children: [
        {
            path: '',
            name: 'tool_recommendation_index',
            component: () => import('@/views/CareerPath/article/index.vue'),
            meta: {
                title: '工具推荐',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/tool_recommendation'
            }
        },
        {
            path: 'detail/:id',
            name: 'tool_recommendation_detail',
            component: () => import('@/views/CareerPath/article/detail.vue'),
            meta: {
                title: '文章详情',
                sidebar: false,
                activeMenu: '/tool_recommendation'
            }
        },
    ]
}

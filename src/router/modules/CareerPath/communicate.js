const Layout = () => import('@/layout/index.vue')

export default {
    path: '/workplace_communication',
    component: Layout,
    name: 'workplace_communication',
    redirect: '/workplace_communication',
    meta: {
        title: '职场沟通',
        icon: 'communicate',
        detail: 'workplace_communication_detail'
    },
    children: [
        {
            path: '',
            name: 'workplace_communication_index',
            component: () => import('@/views/CareerPath/article/index.vue'),
            meta: {
                title: '职场沟通',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/workplace_communication'
            }
        },
        {
            path: 'detail/:id',
            name: 'workplace_communication_detail',
            component: () => import('@/views/CareerPath/article/detail.vue'),
            meta: {
                title: '文章详情',
                sidebar: false,
                activeMenu: '/workplace_communication'
            }
        },
    ]
}

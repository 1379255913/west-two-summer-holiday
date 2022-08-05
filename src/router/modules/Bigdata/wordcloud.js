const Layout = () => import('@/layout/index.vue')

export default {
    path: '/word_cloud',
    component: Layout,
    name: 'word_cloud',
    meta: {
        title: '词云分析',
        icon: 'wordcloud'
    },
    children: [
        {
            path: '',
            name: 'word_cloud_index',
            component: () => import('@/views/BigData/test.vue'),
            meta: {
                title: '词云分析',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/word_cloud'
            }
        }
    ]
}

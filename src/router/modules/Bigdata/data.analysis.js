const Layout = () => import('@/layout/index.vue')

export default {
    path: '/data_analysis',
    component: Layout,
    name: 'data_analysis',
    meta: {
        title: '数据分析',
        icon: 'data-view'
    },
    children: [
        {
            path: '',
            name: 'data_analysis_index',
            component: () => import('@/views/BigData/dataAnalysis/index.vue'),
            meta: {
                title: '数据分析',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/data_analysis'
            }
        }
    ]
}

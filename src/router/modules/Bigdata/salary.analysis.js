const Layout = () => import('@/layout/index.vue')

export default {
    path: '/salary_analysis',
    component: Layout,
    name: 'salary_analysis',
    meta: {
        title: '数据对比',
        icon: 'dotchart'
    },
    children: [
        {
            path: '',
            name: 'salary_analysis_index',
            component: () => import('@/views/BigData/dataComparison/index.vue'),
            meta: {
                title: '数据对比',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/salary_analysis'
            }
        }
    ]
}
